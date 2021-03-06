INLINE_RUNTIME_CHUNK=false npm run build

pushd build/static/js

mv -f 2*.js vendor.track-form.js
mv -f main*.js main.track-form.js
mv -f runtime~main*.js runtime.track-form.js

popd

serve -l 5001 build
