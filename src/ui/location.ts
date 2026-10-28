/**
 * The current page's address as the router reads it: path and query, plus a
 * search page's fragment, which carries its terms (`/search#q=…`) so that
 * they never reach the host.
 */
export const currentAddress = () => {
  const { pathname, search, hash } = window.location;
  const terms =
    /^\/(search|explore)(\.html)?\/?$/.test(pathname) && /^#[^/]/.test(hash);
  return pathname + search + (terms ? hash : '');
};
