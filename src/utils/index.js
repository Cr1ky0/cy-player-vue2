export const getType = (obj)=>{
  return Object.prototype.toString.call(obj).slice(8,-1);
}

/**
 * 将秒转换为00:00格式
 * @param seconds 秒数
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60); // 计算分钟数
  const remainingSeconds = seconds % 60; // 计算剩余的秒数

  // 使用 padStart 方法确保分钟和秒都是两位数字
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};
