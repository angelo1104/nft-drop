import React, { useEffect } from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import { sanityClient, urlfor } from "../../sanity";
import { Collection } from "../../typings";
import Link from "next/link";
import styled from "styled-components";
import { Gradient } from "../../components/Gradient";
import Button from "../../components/Button";

interface Props {
  collection: Collection;
}

// function Home({ collection }: Props) {
//   const connectWithMetamask = useMetamask();
//   const address = useAddress();
//   const disconnect = useDisconnect();
//
//   return (
//     <div
//       className={
//         "flex h-screen flex-col lg:grid lg:grid-cols-10 bg-white/10 bg-dark-img"
//       }
//     >
//       <div className={"lg:col-span-4"}>
//         <div
//           className={
//             "flex flex-col items-center justify-center py-2 lg:min-h-screen"
//           }
//         >
//           <div className={"cool p-2 rounded-xl"}>
//             <img
//               className={"w-44 rounded-xl object-cover lg:h-96 lg:w-72"}
//               src={urlfor(collection.previewImage).url()}
//               alt="ape"
//             />
//           </div>
//
//           <div className={"p-5 text-center space-y-2"}>
//             <h1 className={"text-4xl font-bold text-white"}>
//               {collection.nftCollectionName}
//             </h1>
//             <h2 className={"text-xl text-gray-300"}>
//               {collection.description}{" "}
//             </h2>
//           </div>
//         </div>
//       </div>
//
//       <div
//         className={
//           "flex flex-col flex-1 p-12 lg:col-span-6 pb-12 backdrop-blur-md justify-between"
//         }
//       >
//         {/*Header*/}
//         <div>
//           <header className={"flex items-center justify-between"}>
//             <Link href={"/"}>
//               <h1
//                 className={
//                   "w-52 cursor-pointer text-xl font-extralight sm:w-80"
//                 }
//               >
//                 The{" "}
//                 <span
//                   className={"font-extrabold underline decoration-white-600/50"}
//                 >
//                   PAPAFAM
//                 </span>{" "}
//                 NFT Market Place
//               </h1>
//             </Link>
//
//             <button
//               onClick={address ? disconnect : connectWithMetamask}
//               className={
//                 "rounded-full bg-gray-500 text-gray-200 text-white px-4 py-2 text-xs font-medium lg:px-5 lg:p-y-3 lg:text-base"
//               }
//             >
//               {address ? "Sign Out" : "Sign In"}
//             </button>
//           </header>
//
//           <hr className={"border-white mt-2"} />
//         </div>
//
//         {address && (
//           <p className={"text-center text-sm text-gray-300"}>
//             You&apos;re logged in with wallet{" "}
//             {`${address.substring(0, 5)}...${address.substring(
//               address.length - 5
//             )}`}
//           </p>
//         )}
//         {/*Content*/}
//         <div
//           className={
//             "mt-10 flex flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center"
//           }
//         >
//           <img
//             className={"w-80 object-cover pb-10 lg:h-40"}
//             src={urlfor(collection.mainImage).url()}
//             alt=""
//           />
//
//           <h1
//             className={
//               "text-3xl font-bold lg:text-5xl lg:font-extrabold lg:leading-tight"
//             }
//           >
//             {collection.title}
//           </h1>
//
//           <p className={"pt-2 text-xl text-gray-300"}>
//             13/21 NFT&apos;s claimed
//           </p>
//         </div>
//
//         <button
//           className={
//             "py-4 w-11/12 mt-10 mx-auto w-full bg-gray-500 text-gray-300 rounded-full font-bold"
//           }
//         >
//           Mint NFT (0.01 ETH)
//         </button>
//       </div>
//     </div>
//   );
// }

const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(50px);

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
  }

  .fit-content {
    height: fit-content;
  }

  .animate-bottom {
    position: relative;
    top: 48px;
    transition: all 0.2s ease-in;

    :hover {
      top: 32px;
    }
  }

  .animate {
    position: relative;
    top: 0;

    transition: all 0.2s ease-in;

    :hover {
      top: -16px;
    }
  }

  .gradient-text {
    background: linear-gradient(
      90deg,
      hsl(240deg 95% 92%) 0%,
      hsl(273deg 100% 91%) 12%,
      hsl(302deg 100% 89%) 22%,
      hsl(317deg 100% 87%) 30%,
      hsl(336deg 100% 85%) 38%,
      hsl(360deg 100% 85%) 45%,
      hsl(21deg 100% 77%) 54%,
      hsl(35deg 100% 70%) 64%,
      hsl(44deg 100% 62%) 78%,
      hsl(55deg 86% 51%) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const GradientCanvas = styled.canvas`
  width: 100%;
  height: 100vh;
  --gradient-color-1: #1b7b14;
  --gradient-color-2: #ce1c69;
  --gradient-color-3: #000000;
  --gradient-color-4: #212673;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
`;

function Home({ collection }: Props) {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  useEffect(() => {
    const gradient = new Gradient();

    // @ts-ignore
    gradient.initGradient("#gradient-canvas-id");
  }, []);

  return (
    <div>
      <GradientCanvas data-transition-in id={"gradient-canvas-id"} />

      <Container className={" p-32 pt-16"}>
        <header
          className={"text-white flex justify-between items-center mb-16"}
        >
          <p className={"text-xl font-medium"}>
            The{" "}
            <Link href={"/"}>
              <span
                className={
                  "font-bold underline decoration-white cursor-pointer"
                }
              >
                POG
              </span>
            </Link>{" "}
            Apes
          </p>

          {address && (
            <p>
              You&apos;re logged in with wallet{" "}
              {`${address.substring(0, 5)}...${address.substring(
                address.length - 5
              )}`}
            </p>
          )}

          <button
            onClick={address ? disconnect : connectWithMetamask}
            className={
              "text-sm font-bold px-4 flex items-center py-2 rounded-full bg-gray-400 hover:drop-shadow-3xl"
            }
          >
            {!address ? (
              <>
                Connect wallet&nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            ) : (
              <>
                Disconnect&nbsp;&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </>
            )}
          </button>
        </header>

        <div className={"grid grid-cols-10"}>
          <div className={"flex flex-col col-span-6"}>
            <h1 className={"text-white text-8xl font-extrabold gradient-text"}>
              {collection.title}
            </h1>

            <h3
              className={
                "text-white font-bold text-3xl underline decoration-white mt-12 mb-4"
              }
            >
              {collection.nftCollectionName}
            </h3>

            <p className={"text-white font-medium text-xl"}>
              13/21 NFT&apos;s owned.
            </p>
            <p className={"mt-6 text-gray-300 text-xl"}>
              {collection.description}
            </p>

            <Button>Mint NFT (0.01 ETH)</Button>
          </div>

          <div className={"flex flex-col col-span-4"}>
            <div className={"flex space-x-6"}>
              <div
                className={
                  "text-white fit-content p-10 text-center bg-white/10 backdrop-blur-md fit-content rounded-xl animate"
                }
              >
                <img
                  className={"h-72 object-cover w-56 rounded-xl"}
                  src={urlfor(collection.previewImage).url()}
                  alt=""
                />
              </div>
              <div
                className={
                  "text-white fit-content p-10 text-center bg-white/10 backdrop-blur-md fit-content rounded-xl animate-bottom"
                }
              >
                <img
                  className={"h-72 object-cover w-56 rounded-xl"}
                  src={urlfor(collection.mainImage).url()}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
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
  nftCollectionName,
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
