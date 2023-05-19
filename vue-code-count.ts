
/**
 * count Vue Router RouteRecordRaw number
 * @param rout Vue Router RouteRecordRaw
 * @param number start number
 * @returns 
 */
function routerCount(rout: RouteRecordRaw[] | RouteRecordRaw, number: number) {
  if (Array.isArray(rout)) {
    rout.forEach((item) => {
      if (item.children) {
        number = routerCount(item, number);
      } else {
        number++;
      }
    });
  } else {
    if (rout.children) {
      number = routerCount(rout.children, number);
    } else {
      number++;
    }
  }
  return number;
}