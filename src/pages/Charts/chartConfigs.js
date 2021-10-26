import { colors } from '../../styles';

export const chartConfigs = {
  backgroundColor: "#000",
  backgroundGradientFrom: "#000",
  backgroundGradientTo: "#ccc",
  yAxisInterval:1,
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `${colors.main}`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForLabels: {
    fontSize: "14",
    rotation: "12"
  },
  propsForDots: {
    r: "5",
    strokeWidth: "5",
    stroke: "#fff"
  }
};