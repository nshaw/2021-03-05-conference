INLINE_RUNTIME_CHUNK=false npm run build

pushd build/static/js

mv -f 2*.js vendor.track-table.js
mv -f main*.js main.track-table.js
mv -f runtime~main*.js runtime.track-table.js

popd

serve -l 5002 build
