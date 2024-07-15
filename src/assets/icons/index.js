const svgRequire = require.context('./svg', true, /\.svg$/);

function requireAll(requireContext) {
  requireContext.keys().forEach(requireContext);
}

requireAll(svgRequire);

export default svgRequire;