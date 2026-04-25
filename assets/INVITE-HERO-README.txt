邀请海报主插画说明
------------------
邀请卡页面已下线主图；「生成邀请海报」弹层中的主插画请使用位图文件：

  assets/invite-poster-hero.png

也支持同名 jpg / jpeg / webp（文件名保持 invite-poster-hero.*）。

更新图片后如线上仍显示旧图，可在 app.js 的 loadInviteHeroImage 列表里把 ?v= 数字 +1，
或在 index.html 提升 app.js 的 ?v= 版本号强制刷新缓存。

说明：GitHub Pages 若从 `.../limme-`（无尾部斜杠）进入，相对路径 `./assets/...` 可能解析到站点根目录导致 404；
当前海报加载已改为使用 `limmeAssetBase()` 拼接正确前缀。
