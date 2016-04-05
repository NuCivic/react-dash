testServerPort=3200

# Run dev server
# echo "Kill running dev servers"
# kill `lsof -i:$testServerPort -t`
# echo 'Start dev server'
# node server.js --port=$testServerPort --hot=false &

# Now run tests
echo 'Running karma tests...'
./node_modules/karma/bin/karma start --single-run --no-auto-watch karma.config.js
