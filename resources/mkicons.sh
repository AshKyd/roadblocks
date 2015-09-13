resize () {
src=$1
filename=$2;
size=$3;
convert $src -resize $size ../$filename;
}

# Make directories
mkdir -p ../src/phonegap/www/res/screen/ios
mkdir -p ../src/phonegap/www/res/screen/android
mkdir -p ../src/phonegap/www/res/icon/ios
mkdir -p ../src/phonegap/www/res/icon/android
mkdir -p ../src/chrome/icons
mkdir -p ../src/firefox/icons

# Chrome OS
resize icons/source.png 'src/chrome/icons/512.png' 512;
resize icons/source.png 'src/chrome/icons/128.png' 128;
resize icons/source.png 'src/chrome/icons/48.png' 48;
resize icons/source.png 'src/chrome/icons/16.png' 16;

# Firefox
resize icons/source.png 'src/firefox/icons/512.png' 512;
resize icons/source.png 'src/firefox/icons/128.png' 128;

#iOS
iconPath='src/phonegap/www/res/icon/ios/';
resize icons/source.png $iconPath/icon-40.png,       40;
resize icons/source.png $iconPath/icon-40@2x.png,    80;
resize icons/source.png $iconPath/icon-50.png,       50;
resize icons/source.png $iconPath/icon-50@2x.png,    100;
resize icons/source.png $iconPath/icon-60.png,       60;
resize icons/source.png $iconPath/icon-60@2x.png,    120;
resize icons/source.png $iconPath/icon-60@3x.png,    180;
resize icons/source.png $iconPath/icon-72.png,       72;
resize icons/source.png $iconPath/icon-72@2x.png,    144;
resize icons/source.png $iconPath/icon-76.png,       76;
resize icons/source.png $iconPath/icon-76@2x.png,    152;
resize icons/source.png $iconPath/icon-small.png,    29;
resize icons/source.png $iconPath/icon-small@2x.png, 58;
resize icons/source.png $iconPath/icon.png,          57;
resize icons/source.png $iconPath/icon@2x.png,       114;

iosDestFolder='src/phonegap/www/res/screen/ios/';
promoLandscape='promos/spacekid-landscape-16x9.svg';
promoPortrait='promos/spacekid-portrait-16x9.svg';
resize $promoLandscape $iosDestFolder/screen-iphone-landscape.png 480;
resize $promoLandscape $iosDestFolder/screen-iphone-landscape-2x.png 960;
resize $promoPortrait $iosDestFolder/screen-iphone-portrait.png 320;
resize $promoPortrait $iosDestFolder/screen-iphone-portrait-2x.png 640;

promoLandscape='promos/spacekid-landscape-4x3.svg';
promoPortrait='promos/spacekid-portrait-4x3.svg';
resize $promoLandscape $iosDestFolder/screen-ipad-landscape.png 1024;
resize $promoLandscape $iosDestFolder/screen-ipad-landscape-2x.png 2048;
resize $promoLandscape $iosDestFolder/screen-ipad-portrait.png 768;
resize $promoLandscape $iosDestFolder/screen-ipad-portrait-2x.png 1536;


#Android
resize icons/source.png 'src/phonegap/www/res/icon/android/icon-36-ldpi.png',   36;
resize icons/source.png 'src/phonegap/www/res/icon/android/icon-48-mdpi.png',   48;
resize icons/source.png 'src/phonegap/www/res/icon/android/icon-72-hdpi.png',   72;
resize icons/source.png 'src/phonegap/www/res/icon/android/icon-96-xhdpi.png',  96;
resize icons/source.png 'src/phonegap/www/res/icon/android/icon-96-xxhdpi.png', 144;

promoLandscape='promos/spacekid-landscape-16x9.svg';
promoPortrait='promos/spacekid-portrait-16x9.svg';
androidDestFolder='src/phonegap/www/res/screen/android/';
resize $promoLandscape $androidDestFolder/screen-hdpi-landscape.png 800;
resize $promoLandscape $androidDestFolder/screen-ldpi-landscape.png 320;
resize $promoLandscape $androidDestFolder/screen-mdpi-landscape.png 480;
resize $promoLandscape $androidDestFolder/screen-xhdpi-landscape.png 1280;
resize $promoPortrait $androidDestFolder/screen-hdpi-portrait.png 480;
resize $promoPortrait $androidDestFolder/screen-ldpi-portrait.png 200;
resize $promoPortrait $androidDestFolder/screen-mdpi-portrait.png 320;
resize $promoPortrait $androidDestFolder/screen-xhdpi-portrait.png 720;
