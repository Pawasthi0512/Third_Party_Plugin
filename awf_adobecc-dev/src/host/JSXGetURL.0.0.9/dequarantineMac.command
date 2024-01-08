#
# De-quarantine the frameworks
#

export SCRIPTDIR=`dirname "$0"`/
cd "$SCRIPTDIR"
export SCRIPTDIR=`pwd`

xattr -dr com.apple.quarantine JSXGetURL/osx10_64/JSXGetURL_x64R.framework

echo ""
echo 'JSXGetURL is now de-quarantined.'
echo ""
echo "You can now close this Terminal window"
echo ""

