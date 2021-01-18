import {
  differenceInHours,
  differenceInMinutes,
  format,
  fromUnixTime,
} from "date-fns";

export const getDomainFromUrl = (url: string) => {
  const exp = new RegExp(
    /^[a-z][a-z0-9+\-.]*:\/\/([a-z0-9\-._~%!$&'()*+,;=]+@)?([a-z0-9\-._~%]+|↵\[[a-z0-9\-._~%!$&'()*+,;=:]+\])/g
  );
  return url.match(exp);
};

export const getTimeSinceUnix = (time: number) => {
  const now = new Date();
  const date = fromUnixTime(time);
  let diff = differenceInHours(now, date);
  if (diff < 1) {
    return `${differenceInMinutes(now, date)} minutes ago`;
  } else if (diff > 24) {
    return "a while ago";
  } else {
    return `${diff} hour${diff === 1 ? "" : "s"} ago`;
  }
};

export const formatUnixTime = (time: number) => {
  const date = fromUnixTime(time);
  return format(date, "yyyy-MMM-dd kk:mm:ss X");
};
