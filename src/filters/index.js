export default function filterHandler (Vue) {
  Vue.filter('dateFilter',function (val,type) {
    const date = new Date(val)
    return date.getFullYear() + type + (date.getMonth() + 1) + type + date.getDate()
  })
  Vue.filter('imgFilter',function (val) {
    return val.replace('w.h','128.180')
  })
}