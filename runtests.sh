# Run dev server
echo 'Start dev server'
node server.js --port=3200 &

# Now run tests
echo 'Running karma tests...'
./node_modules/karma/bin/karma start --single-run --no-auto-watch karma.config.js
