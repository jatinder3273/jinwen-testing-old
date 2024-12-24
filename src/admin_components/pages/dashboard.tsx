"use client";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { numberToFixed, numberWithCommas } from "../utils/functions";
import CountUp from "react-countup";
import useAuthService from "@/utils/authService";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import CustomButton from "@/components/theme/customButton";
import axios from "axios";

const AdminDashboard = () => {
  const router = useRouter();
  const { getUserRoleId } = useAuthService();
  const roleId = getUserRoleId();

  const [percentageUp, setPercentageUp] = useState(5); // Default up percentage value
  const [percentageDown, setPercentageDown] = useState(5); // Default down percentage value
  const [news, setNews] = useState([]);

  const [getDashboardAssets, { response, loading, error }] = useFetch(
    "/admin/dashboard/",
    {
      method: "POST",
    }
  );
  const cardsData = response?.data;

  useEffect(() => {
    getDashboardAssets({});
  }, []);
  const generateNewValues = () => {
    console.log(
      `Submitting percentage up: ${percentageUp}, percentage down: ${percentageDown}`
    );
    getDashboardAssets({
      body: { percentageUp, percentageDown },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateNewValues();
  };

  const fetchNews = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
      const response = await axios.get(
        `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`
      );
      setNews(response.data.slice(0, 5)); // Get the top 5 news headlines
    } catch (error) {
      console.error("Failed to fetch news:", error);
      toast.error("Failed to fetch financial news.");
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value ? Number(value) : undefined);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);

  const adminCards = [
    {
      title: "Total Investors",
      description: "in the last 10 days",
      count: cardsData?.total_investor || 0,
      percentage: cardsData?.increase_percentage || 0,
      price: undefined,
      link: "/admin/investors",
      decimal: false,
    },
    {
      title: "Approved Investors",
      description: "Total approved investors",
      count: cardsData?.total_approved_investor || 0,
      price: undefined,
      link: "/admin/investors",
      decimal: false,
    },
    {
      title: "Pending Investors",
      description: "Total requests that are pending for investors",
      count: cardsData?.total_pending_investor || 0,
      price: undefined,
      link: "/admin/investors/pending",
      decimal: false,
    },
    {
      title: "Total Positions",
      description: "These are the total positions across the portfolio",
      count: cardsData?.total_trades || 0,
      price: undefined,
      link: "/admin/trades",
      decimal: false,
    },
    {
      title: "Latest Financial News",
      description: "Top 5 Financial Headlines",
      news: news,
      isNewsCard: true,
    },

    // {
    //   title: "Total Exposure Value (Including All Assigned Options)",
    //   description:
    //     "This is the total exposure value in the accounts including all assigned options",
    //   count: cardsData?.total_exposure_value_worst || 0,
    //   price: undefined,
    //   decimal: true,
    // },
    // {
    //   title: "Current Exposure Value",
    //   description: "This is the current exposure value in the account",
    //   count: cardsData?.total_exposure_value || 0,
    //   price: undefined,
    //   decimal: true,
    // },
    // {
    //   title: "What-if Analysis (Downward Change)",
    //   description: "This is the exposure value if the market goes down by 5%",
    //   count: cardsData?.total_what_if_analysis || 0,
    //   price: undefined,
    //   decimal: true,
    // },
    // {
    //   title: "What-if Analysis (Upward Change)",
    //   description: "This is the exposure value if the market goes up by 5%",
    //   count: cardsData?.total_what_if_analysis_up || 0,
    //   price: undefined,
    //   decimal: true,
    // },
  ];
  const investorCards = [
    {
      title: "Total Investments",
      price: cardsData?.total_investment || 0,
      percentage: cardsData?.last_ten_days_investment || 0,
      description: "in last 10 days",
    },
    {
      title: "Total Profits",
      price: cardsData?.total_profit || 0,
      percentage: cardsData?.last_ten_days_profit || 0,
      description: "in last 10 days",
    },
    {
      title: "Total Loss",
      price: cardsData?.total_loss || 0,
      percentage: cardsData?.last_ten_days_loss || 0,
      description: "in last 10 days",
    },
    {
      title: "Latest Financial News",
      description: "Top 5 Financial Headlines",
      news: news,
      isNewsCard: true,
    },
  ];

  const dashboardCards: any[] = roleId === 1 ? adminCards : investorCards;
  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <AiOutlineArrowUp className="text-green-500 text-lg" />
          <label
            htmlFor="percentageUp"
            className="block text-sm font-medium text-gray-700"
          >
            Upward Exposure Value (%):
          </label>
          <input
            type="number"
            id="percentageUp"
            name="percentageUp"
            value={percentageUp}
            onChange={handleInputChange(setPercentageUp)}
            className="mt-1 p-2 block w-24 shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineArrowDown className="text-red-500 text-lg" />
          <label
            htmlFor="percentageDown"
            className="block text-sm font-medium text-gray-700"
          >
            Downward Exposure Value (%):
          </label>
          <input
            type="number"
            id="percentageDown"
            name="percentageDown"
            value={percentageDown}
            onChange={handleInputChange(setPercentageDown)}
            className="mt-1 p-2 block w-24 shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <CustomButton
          variantType="filled"
          // className="mt-4"
          onClick={generateNewValues}
        >
          Submit
        </CustomButton>
      </form>
      <div className="flex flex-wrap gap-y-5 -mx-4">
        {dashboardCards.map((item) => {
          const isIncreasePercent = item.percentage > 0;

          return (
            <div
              key={item.title}
              className="px-4 basis-[100%] xl:basis-[33.33%] lg:basis-[50%]"
            >
              <div
                className="flex flex-col justify-between p-[2.125rem] h-full bg-white rounded-[10px] border-r-[2px] border-r-dbBlack cursor-pointer hover:shadow-[10px_10px_20px_-10px_rgba(0,0,0,0.1)] transition-shadow"
                onClick={() => router.push(item.link ?? "")}
              >
                <div>
                  <h4 className="text-xl text-[#494F53] font-[300] mb-[6px]">
                    {item.title}
                  </h4>

                  {item.isNewsCard ? (
                    <ul className="list-disc ml-4">
                      {item.news.map((newsItem, index) => (
                        <li key={index} className="text-sm text-[#494F53]">
                          <a
                            href={newsItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 underline"
                          >
                            {newsItem.headline}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <CountUp
                      end={item.count ?? item.price}
                      separator=","
                      duration={2}
                      decimals={item.decimal ? 2 : 0}
                    >
                      {({ countUpRef }) => (
                        <span className="text-4xl font-[500]">
                          {item?.price || item?.decimal ? "$" : ""}
                          <span ref={countUpRef} />
                        </span>
                      )}
                    </CountUp>
                  )}
                </div>
                {!item.isNewsCard && (
                  <div className="flex items-center gap-2 mt-[1.75rem] text-[14px]">
                    {item?.percentage ? (
                      <span
                        className={`shrink-0 px-2 py-2 leading-[1] rounded-[4px] font-[600] ${
                          isIncreasePercent
                            ? "bg-[#AAFFE6] text-[#0ABA85]"
                            : "bg-[#FFB7B7] text-[#FF1919]"
                        }`}
                      >
                        {isIncreasePercent ? "+" : ""}
                        {numberToFixed(item?.percentage)}%
                      </span>
                    ) : null}
                    <span className="text-[#494F53]">
                      {item?.percentage
                        ? isIncreasePercent
                          ? "Increased"
                          : "Decreased"
                        : null}{" "}
                      {item?.description}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {/* Render portfolio exposures */}
        {cardsData?.portfolio_exposures?.map((portfolio, index) => (
          <div
            key={index}
            className="px-4 basis-[100%] xl:basis-[33.33%] lg:basis-[50%]"
          >
            <div className="flex flex-col justify-between p-[2.125rem] h-full bg-white rounded-[10px] border-r-[2px] border-r-dbBlack cursor-pointer hover:shadow-[10px_10px_20px_-10px_rgba(0,0,0,0.1)] transition-shadow">
              <div>
                <h4 className="text-xl text-[#494F53] font-[300] mb-[6px]">
                  Account ID: {portfolio.account_id}
                </h4>
                <p className="font-bold">
                  Total Exposure Value With Assigned Options:{" "}
                  <span className="font-normal">
                    $
                    {numberWithCommas(
                      portfolio.total_exposure_value.toFixed(2)
                    )}
                  </span>
                </p>
                <p className="font-bold">
                  Current Exposure Value:{" "}
                  <span className="font-normal">
                    ${numberWithCommas(portfolio.total_equity_value.toFixed(2))}
                  </span>
                </p>
                <p className="font-bold">
                  Exposure Value given {percentageDown}% decrease:{" "}
                  <span className="font-normal">
                    $
                    {numberWithCommas(
                      portfolio.what_if_down_exposure.toFixed(2)
                    )}
                  </span>
                </p>
                <p className="font-bold">
                  Exposure Value given {percentageUp}% increase:{" "}
                  <span className="font-normal">
                    $
                    {numberWithCommas(portfolio.what_if_up_exposure.toFixed(2))}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
