#!/bin/sh

outfile=example.js
printf 'var samplePrograms = {\n' >$outfile

for xml in *.xml
do
  label=`basename "$xml" .xml`
  ./xmltojs.py -l "$label" "$xml" >>$outfile
  printf ',\n' >>$outfile
done

printf "'_': undefined\n" >>$outfile
printf '};\n' >>$outfile
printf "delete samplePrograms._;\n" >>$outfile
