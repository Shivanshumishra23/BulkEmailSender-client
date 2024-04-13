import moment from "moment";

export const formattedDate = (createAd) => moment(createAd).format("D MMM YY");
