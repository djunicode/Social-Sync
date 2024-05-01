"use client";

const SearchCard = ({ title, views, user, date, live }) => {
  return (
    <div className="flex items-center w-[28rem] h-40 rounded-3xl relative border-2 border-white border-opacity-20 bg-[#2E2F3F] bg-opacity-60">
      <div className="w-6/12 h-full rounded-3xl bg-[#867D7D]"></div>
      <div className="pl-1.5">
        <div className="font-medium text-xl text-white">{title}</div>
        <div className="font-semibold text-base text-[#867D7D]">
          {views} views
        </div>
        <div className="flex items-center">
          <div className="rounded-full bg-[#D9D9D9] w-8 h-8"></div>
          <div className="font-semibold text-xl text-[#867D7D] pl-2 underline underline-offset-4 decoration-[#867D7D] decoration-solid decoration-2 hover:cursor-pointer">
            @{user}
          </div>
        </div>
        <div className="font-semibold text-base text-[#867D7D]">
          {live === "true" ? (
            <div className="flex items-center">
              <div className="border-4 rounded-full border-[#D20713]"></div>
              <span className="pl-1">Currently live</span>
            </div>
          ) : (
            <span>Streamed on {date}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
