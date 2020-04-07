import ContentLoader from 'react-content-loader'

const Loader = () => (
  <div>
    <ContentLoader
      uniqueKey="loader"
      speed={2}
      width={500}
      height={600}
      viewBox="0 0 500 600"
      backgroundColor="#9d87c4"
      foregroundColor="#ecebeb"
    >
      <rect x="4" y="14" rx="3" ry="3" width="88" height="6" />
      <rect x="4" y="33" rx="3" ry="3" width="52" height="6" />
      <rect x="2" y="223" rx="4" ry="4" width="490" height="8" />
      <rect x="2" y="250" rx="4" ry="4" width="400" height="8" />
      <rect x="2" y="277" rx="4" ry="4" width="300" height="8" />
      <circle cx="468" cy="27" r="23" />
      <rect x="2" y="405" rx="4" ry="4" width="490" height="41" />
      <rect x="4" y="332" rx="4" ry="4" width="140" height="40" />
      <rect x="339" y="332" rx="4" ry="4" width="147" height="40" />
      <rect x="2" y="132" rx="8" ry="8" width="380" height="16" />
      <rect x="2" y="168" rx="8" ry="8" width="280" height="16" />
      <rect x="168" y="331" rx="4" ry="4" width="147" height="40" />
    </ContentLoader>
  </div>
)

export default Loader
