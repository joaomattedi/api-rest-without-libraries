export function buildRoutePath(path) {
  const routeParams = /:([a-zA-Z]+)/g

  const pathParams = path.replaceAll(routeParams,'([a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathParams}`)

  return pathRegex
}
