"use client"
import useStore from "@/lib/zustand"
import {ArrowRight, BackgroundShape1 , BackgroundShape2, BackgroundShape3, Dollar, Graph, Play} from "../../../public/svgs"
import "../../lib/fonts.css"
export default function Page() {
    const { user, setAuth, setToken, setUser } = useStore()

    const negText = {
      fontFamily:"PT Mono",
      color:"#F26602",
      mixBlendMode:"difference",
    }
    
    const negDiv = {
      fontFamily:"PT Mono",
      zIndex:10,
      backgroundColor:"#F26602 ",
      mixBlendMode: "difference ",
    }
    const negDivInner = {
      fontFamily:"PT Mono",
      zIndex:10,
      backgroundColor:"#FF8E00 ",
      mixBlendMode: "difference ",
    }
  return (
    <div className="relative h-[450vh] lg:h-[350vh] overflow-hidden">
      <div className="z-20 flex flex-col h-[auto] bg-dark justify-center items-center ">
        <BackgroundShape1 />
      </div>
      <div className="z-10 flex flex-col h-[auto] bg-dark justify-center items-center ">
        <BackgroundShape2 />
      </div>
      <div className="z-0 flex flex-col h-[auto] bg-dark justify-center items-center ">
        <BackgroundShape3 />
      </div>
      <div className="absolute top-0 left-0 w-[100vw]">

      {/* NavBar */}
      <nav className="w-[calc(100%-7px)] h-20 pl-10 flex items-center justify-end gap-10 pr-10">
        <div className="flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-[#F06822ee] active:text-primary border-2 border-primary active:bg-black w-[200px] rounded-full h-10 bg-primary text-black">
          Sign Up
        </div>
        <div 
        onClick={() => {
          if(user){
            localStorage.removeItem("token");
            setToken(null);
            setAuth(false);
            setUser(null);
          }
          else{
            setAuth(true)
          }
        }}
        className="flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-[#222] active:text-black active:bg-primary border-primary border-2 w-[200px] rounded-full h-10 text-primary"
        >
          {
            user 
            ? "Log Out"
            : "Log In"
          }
        </div>
      </nav>

      {/* Landing Page Content */}
      <div className="flex  lg:h-[calc(100vh-80px)] h-[calc(200vh-80px)] flex-col w-screen justify-center">

          <div className="pl-20 pt-20">
            {/* Hello {user?user.username:"user"} */}
            <h1
              style={negText}
              className="text-8xl font-bold text-transparent bg-blend-"
            >
              Social Sync
            </h1>

            <button
              style={negDiv}
              className="w-[auto] py-2 px-5 font-semibold hover:bg-primary/90 transition-all text-md rounded-full "
            >
              <span
                style={{ color: "white !important", mixBlendMode: "normal" }}
                className="flex gap-2 items-center justify-center"
              >
                Get Started
                <ArrowRight />
              </span>
            </button>


          </div>

          {/* Cards */}

          <div className="p-16 flex flex-col lg:flex-row items-center lg:justify-end gap-16">
            <div
              style={negDivInner}
              className="rounded-xl z-10 lg:w-[30%] max-w-[250px] h-[250px] bg-gray-400 flex flex-col justify-evenly items-center"
            >
              <Play />
              <h3 className="w-[70%] text-center text-lg">Steam or watch from anywhere, anytime</h3>
            </div>
            <div
              style={negDivInner}
              className="rounded-xl z-10 lg:w-[30%] max-w-[250px] h-[250px] flex flex-col justify-evenly items-center"
            >
              <Dollar />
              <h3 className="w-[70%] text-center text-lg">Invest on your favorite creators</h3>
            </div>
            <div
              style={negDivInner}
              className="rounded-xl z-10 lg:w-[30%] max-w-[250px] h-[250px] flex flex-col justify-evenly items-center"
            >
              <Graph />
              <h3 className="w-[70%] text-center text-lg">UserBase analysis for creators</h3>
            </div>
          </div>

      </div>

      {/* Info 1 */}

      <div className="flex justify-evenly pt-[17vh] h-[80vh]  min-w-[calc(100vw - 7px)] lg:flex-row flex-col items-center">
        <div className="lg:w-[500px] w-[80%] h-[400px] bg-gray-400 rounded-xl"></div>
        <div className="lg:w-[500px] w-[80%] h-[400px] text-center lg:text-end  lg:text-5xl text-3xl font-bold flex items-center rounded-xl">Stream anytime or watch your favorite creators live</div>
      </div>

      {/* Info 2 */}

      <div className="flex justify-evenly pt-[17vh] h-[80vh]  min-w-[calc(100vw - 7px)] lg:flex-row flex-col-reverse items-center">
        <div className="lg:w-[500px] w-[80%] h-[400px] text-center lg:text-start  lg:text-5xl text-3xl font-bold flex items-center rounded-xl">
        Invest in creators to earn when they do well
        </div>
        <div className="lg:w-[500px] w-[80%] h-[400px] bg-gray-400 rounded-xl"></div>
      </div>

      {/* Info 3 */}

      <div className="flex justify-evenly pt-[17vh] h-[80vh]  min-w-[calc(100vw - 7px)] lg:flex-row flex-col items-center">
        <div className="lg:w-[500px] w-[80%] h-[400px] bg-gray-400 rounded-xl"></div>
        <div className="lg:w-[500px] w-[80%] h-[400px] text-center lg:text-end  lg:text-5xl text-3xl font-bold flex items-center rounded-xl">
        Creators have access to specialized UserBase analysis
        </div>
      </div>

      </div>
    </div>
  );
}
