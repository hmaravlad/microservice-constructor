VERSION=$1
npx pkg dist/main.js --out-path executables 
PACKAGE_NAME=microservice-constructor_$VERSION
mkdir -p $PACKAGE_NAME/usr/local/bin
cp executables/main-linux $PACKAGE_NAME/usr/local/bin/microservice-constructor
mkdir -p $PACKAGE_NAME/DEBIAN

echo "Package: microservice-constructor"        > $PACKAGE_NAME/DEBIAN/control
echo "Version: $VERSION"                        >> $PACKAGE_NAME/DEBIAN/control
echo "Section: base"                            >> $PACKAGE_NAME/DEBIAN/control
echo "Priority: optional"                       >> $PACKAGE_NAME/DEBIAN/control
echo "Architecture: i386"                       >> $PACKAGE_NAME/DEBIAN/control
echo "Maintainer: hmara.vladislav2@gmail.com"   >> $PACKAGE_NAME/DEBIAN/control
echo "Description: Microservice constructor"    >> $PACKAGE_NAME/DEBIAN/control

dpkg-deb --build $PACKAGE_NAME

mv executables/main-win.exe microservice-constructor.exe