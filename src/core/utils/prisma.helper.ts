const createWhereObject = (filter: {
  [key: string]: string | number;
}): { [key: string]: string | { contains: string; mode: "insensitive" } } => {
  const where: {
    [key: string]: string | { contains: string; mode: "insensitive" };
  } = {};

  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      if (
        typeof value === "string" &&
        (value === "true" || value === "false")
      ) {
        where[key] = JSON.parse(value);
      } else {
        where[key] = { contains: value.toString(), mode: "insensitive" };
      }
    });
  }

  return where;
};

export { createWhereObject };
