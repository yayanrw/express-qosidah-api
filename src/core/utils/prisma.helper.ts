const createWhereObject = (filter: {
  [key: string]: string | number;
}): { [key: string]: string | { contains: string } } => {
  const where: { [key: string]: string | { contains: string } } = {};

  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      if (
        typeof value === "string" &&
        (value === "true" || value === "false")
      ) {
        where[key] = JSON.parse(value);
      } else {
        where[key] = { contains: String(value) };
      }
    });
  }

  return where;
};

export { createWhereObject };
