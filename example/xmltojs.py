#!/usr/bin/python
# convert XML into JS
# Usage:
#   ./xmltojs.py [-l label] [-x] [file]

from xml.dom.minidom import parse
import re, sys
import argparse

parser = argparse.ArgumentParser(description='Convert XML into JS')
parser.add_argument('-l', '--label', default='sample',
                    help='Specify the property name for this example')
parser.add_argument('-x', '--xmlout', action='store_true',
                    help='Pretty printing of this XML file (not JS)')
parser.add_argument('xmlfile', nargs='?', type=argparse.FileType('r'),
                    default=sys.stdin)

args = parser.parse_args()

doc = parse(args.xmlfile).toprettyxml(indent=' ')
if args.xmlout:
  print(doc)
  sys.exit(0)

print("'{0}': [".format(args.label))
for line in doc.split('\n'):
  if len(line) > 0 and not re.match(r'^\s*$', line):
    line = re.sub(r'^( *)', r"  \1'", line)
    line = re.sub(r'$', r"',", line)
    print(line)
print("  ''")
print("].join('')")
