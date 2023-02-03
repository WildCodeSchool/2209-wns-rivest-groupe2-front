import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Places visited",
    value: "12",
    footer: {
      color: "text-green-500",
      value: "+50%",
      label: "more than last week",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Number of rated places",
    value: "6",
    footer: {
      color: "text-green-500",
      value: "+33%",
      label: "more than last week",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Average rate  ",
    value: "3.5",
    footer: {
      color: "text-red-500",
      value: "-0.5%",
      label: "less than last week",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Review written",
    value: "1",
    footer: {
      color: "text-green-500",
      value: "",
      label: "same than last week",
    },
  },
];

export default statisticsCardsData;
