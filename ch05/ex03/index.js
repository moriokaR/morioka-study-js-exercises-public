// 対象の月名: "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"

export function is31DaysIfElse(month) {
  if (month === "Jan") {
    return true;
  } else if (month === "Feb") {
    return false;
  } else if (month === "Mar") {
    return true;
  } else if (month === "Apr") {
    return false;
  } else if (month === "May") {
    return true;
  } else if (month === "Jun") {
    return false;
  } else if (month === "Jul") {
    return true;
  } else if (month === "Aug") {
    return true;
  } else if (month === "Sep") {
    return false;
  } else if (month === "Oct") {
    return true;
  } else if (month === "Nov") {
    return false;
  } else if (month === "Dec") {
    return true;
  }
}

export function is31DaysSwitch(month) {
  switch (month) {
    case "Jan":
      return true;
    case "Feb":
      return false;
    case "Mar":
      return true;
    case "Apr":
      return false;
    case "May":
      return true;
    case "Jun":
      return false;
    case "Jul":
      return true;
    case "Aug":
      return true;
    case "Sep":
      return false;
    case "Oct":
      return true;
    case "Nov":
      return false;
    case "Dec":
      return true;
  }
}
