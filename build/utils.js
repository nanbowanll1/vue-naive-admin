const httpsReg = /^https:\/\//

export function wrapperEnv(envOptions) {
  if (!envOptions) return {}
  const result = {}

  for (const envKey in envOptions) {
    let envVal = envOptions[envKey]
    if (['true', 'false'].includes(envVal)) {
      envVal = envVal === 'true'
    }
    if (['VITE_PORT'].includes(envVal)) {
      envVal = +envVal
    }
    if (envKey === 'VITE_PROXY' && envVal) {
      try {
        envVal = JSON.parse(envVal.replace(/'/g, '"'))
      } catch (error) {
        envVal = ''
      }
    }

    result[envKey] = envVal
    if (typeof envKey === 'string') {
      process.env[envKey] = envVal
    } else if (typeof envKey === 'object') {
      process.env[envKey] = JSON.stringify(envVal)
    }
  }
  return result
}

export function createProxy(list = []) {
  const result = {}
  for (const [prefix, target] of list) {
    const isHttps = httpsReg.test(target)

    result[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? { secure: false } : {})
    }
  }
  return result
}