export const StringAvatar = (name) => {
  let initials;
  if (name?.includes(" ")) {
    initials = name
      .split(" ")
      .map((part) => part[0]) // Get the first character of each part
      .join(""); // Join the initials into a single string
  } else {
    // If the name consists of only one word, use the first two characters as initials
    initials = name?.slice(0, 2).toUpperCase();
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
};

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};
