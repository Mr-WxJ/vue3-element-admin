export function isUrl(rule: any, value: any, callback: any) {
  const reg = /^(http|https|ftp):\/\/[\w\-]+(\.[\w\-]+)*([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("Url格式不正确"));
  }
}

export function isTbPid(rule: any, value: any, callback: any) {
  const reg = /^mm_[a-zA-Z\d]+_[a-zA-Z\d]+_[a-zA-Z\d]+$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("淘宝PID格式不正确"));
  }
}
