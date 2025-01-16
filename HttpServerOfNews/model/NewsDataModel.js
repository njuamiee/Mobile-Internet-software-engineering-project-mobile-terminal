/* NewsDataModel*/
const NewsData = require('../model/NewsData');
const NewsFile = require('../model/NewsFile');


var maxNewsId = 5;
var newsDataArray = [
  new NewsData(4, '移动互联网作业11.7截至', '移动互联网作业11.7截至', [new NewsFile(0, '/images/1.png', 0, 0), new NewsFile(1, '/images/3.png', 0, 1)], '2023年04月20日'),
  new NewsData(3, '团组织生活主题科技创新', '团组织生活主题科技创新', [new NewsFile(0, '/images/2.png', 0, 0), new NewsFile(1, '/images/2.png', 0, 1)], '2023年04月20日'),
  new NewsData(2, '备战软院篮球赛', '备战软院篮球赛', [new NewsFile(0, '/images/3.png', 0, 0), new NewsFile(1, '/images/1.png', 0, 1)], '2023年04月20日'),
  new NewsData(1, '寄回家一双鞋子', '寄回家一双鞋子', [new NewsFile(1, '/images/1.png', 0, 1)], '2023年04月20日'),
  new NewsData(0, '给家里打电话', '给家里打电话', [new NewsFile(2, '/images/2.png', 0, 2)], '2023年04月20日')
];

var maxFileId = 3;
var newsFileArray = [
  new NewsFile(0, '/images/1.png', 0, 0),
  new NewsFile(1, '/images/2.png', 0, 1),
  new NewsFile(2, '/images/3.png', 0, 2),
];

var newsType = [
  { id: 0, name: '全部' },
  { id: 1, name: '学习' },
  { id: 2, name: '学工' },
  { id: 3, name: '生活' },
  { id: 4, name: '家人' },
  { id: 5, name: '体育' },
  { id: 6, name: '科技' }
];

module.exports = {
  maxNewsId,
  maxFileId,
  newsDataArray,
  newsFileArray,
  newsType
}