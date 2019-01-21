export const paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  getCursor = () => null,
}: {
  after?: string | null;
  pageSize?: number;
  results: any[];
  getCursor?: (item: any) => string | null;
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(result => {
    // if an result has a `cursor` on it, use that, otherwise try to generate one
    const resultCursor = result.cursor || getCursor(result);
    // if there's still not a cursor, return false by default
    return resultCursor ? cursor === resultCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};
