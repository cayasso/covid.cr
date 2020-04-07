import ga from 'react-ga'

export const init = () => {
  ga.initialize('UA-162851057-1')
}

export const logPageView = () => {
  setTimeout(() => {
    const url = window.location.pathname
    const { title } = document
    ga.set({ url, title })
    ga.pageview(url, [], title)
  }, 0)
}

export const logEvent = (category, action, extra) => {
  ga.event({ category, action, ...extra })
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ga.exception({ description, fatal })
  }
}
