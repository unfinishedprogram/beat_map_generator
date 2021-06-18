for arg in "$@"
do
  node ./dist/index.js "$arg" "./template" "./map_output"
done
echo "$#" maps generated
echo "Generated maps can be found in ./map_output/"