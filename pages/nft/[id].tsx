import React from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import { sanityClient, urlfor } from "../../sanity";
import { Collection } from "../../typings";
import Link from "next/link";

interface Props {
  collection: Collection;
}

function Home({ collection }: Props) {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <div
      className={
        "flex h-screen flex-col lg:grid lg:grid-cols-10 bg-white/10 bg-dark-img"
      }
    >
      <div className={"lg:col-span-4"}>
        <div
          className={
            "flex flex-col items-center justify-center py-2 lg:min-h-screen"
          }
        >
          <div className={"cool p-2 rounded-xl"}>
            <img
              className={"w-44 rounded-xl object-cover lg:h-96 lg:w-72"}
              src={urlfor(collection.previewImage).url()}
              alt="ape"
            />
          </div>

          <div className={"p-5 text-center space-y-2"}>
            <h1 className={"text-4xl font-bold text-white"}>
              {collection.nftCollectionName}
            </h1>
            <h2 className={"text-xl text-gray-300"}>
              {collection.description}{" "}
            </h2>
          </div>
        </div>
      </div>

      <div
        className={
          "flex flex-col flex-1 p-12 lg:col-span-6 pb-12 backdrop-blur-md justify-between"
        }
      >
        {/*Header*/}
        <div>
          <header className={"flex items-center justify-between"}>
            <Link href={"/"}>
              <h1
                className={
                  "w-52 cursor-pointer text-xl font-extralight sm:w-80"
                }
              >
                The{" "}
                <span
                  className={"font-extrabold underline decoration-white-600/50"}
                >
                  PAPAFAM
                </span>{" "}
                NFT Market Place
              </h1>
            </Link>

            <button
              onClick={address ? disconnect : connectWithMetamask}
              className={
                "rounded-full bg-gray-500 text-gray-200 text-white px-4 py-2 text-xs font-medium lg:px-5 lg:p-y-3 lg:text-base"
              }
            >
              {address ? "Sign Out" : "Sign In"}
            </button>
          </header>

          <hr className={"border-white mt-2"} />
        </div>

        {address && (
          <p className={"text-center text-sm text-gray-300"}>
            You&apos;re logged in with wallet{" "}
            {`${address.substring(0, 5)}...${address.substring(
              address.length - 5
            )}`}
          </p>
        )}
        {/*Content*/}
        <div
          className={
            "mt-10 flex flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center"
          }
        >
          <img
            className={"w-80 object-cover pb-10 lg:h-40"}
            src={urlfor(collection.mainImage).url()}
            alt=""
          />

          <h1
            className={
              "text-3xl font-bold lg:text-5xl lg:font-extrabold lg:leading-tight"
            }
          >
            {collection.title}
          </h1>

          <p className={"pt-2 text-xl text-gray-300"}>
            13/21 NFT&apos;s claimed
          </p>
        </div>

        <button
          className={
            "py-4 w-11/12 mt-10 mx-auto w-full bg-gray-500 text-gray-300 rounded-full font-bold"
          }
        >
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `
    *[_type =="collection" && slug.current == $id][0]{
  _id,
  title,
  address,
  description,
  mainImage {
    asset,
  },
  previewImage {
    asset,
  },
  slug {
    current,
  },
  creator -> {
    _id,
    name,
    address,
    slug {
      current
    },
  },
}
  `;

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  });

  if (!collection) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      collection: collection,
    },
  };
};
