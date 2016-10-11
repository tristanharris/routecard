function isGridRef(text) {
  var regex=new RegExp(/^\s*([HJNOSThjnost])([A-HJ-Za-hj-z])\s*(\d+)\s*(\d*)\s*$/)
  return(regex.test(text));
}

function grToEN(gridref) {
  var regex=new RegExp(/^\s*([HJNOSThjnost])([A-HJ-Za-hj-z])\s*(\d+)\s*(\d*)\s*$/)
  if (regex.test(gridref)) {
    var gr1 = RegExp.$1;
    var gr2 = RegExp.$2;
    var gr3 = RegExp.$3;
    var gr4 = RegExp.$4;
    if (gr3.length%2==0 && gr4.length==0) {
      gr4=gr3.substr(gr3.length/2);
      gr3=gr3.substr(0,gr3.length/2);
    }
    if (gr3.length!=gr4.length) {
      var tmp=new Array();
      tmp[0]='error';
      tmp[1]='both numbers must be the same length';
      return(tmp);
    }

    var easting=0;
    var northing=0;
    switch (gr1.toUpperCase()) {
      case 'S':easting+=0;
             northing+=0;
             break;
      case 'T':easting+=500000;
             northing+=0;
             break;
      case 'N':easting+=0;
             northing+=500000;
             break;
      case 'O':easting+=500000;
             northing+=500000;
             break;
      case 'H':easting+=0;
             northing+=1000000;
             break;
      case 'J':easting+=500000;
             northing+=1000000;
             break;
    }
    switch (gr2.toUpperCase()) {
      case 'A':case 'F':case 'L':case 'Q':case 'V':easting+=0;
             break;
      case 'B':case 'G':case 'M':case 'R':case 'W':easting+=100000;
             break;
      case 'C':case 'H':case 'N':case 'S':case 'X':easting+=200000;
             break;
      case 'D':case 'J':case 'O':case 'T':case 'Y':easting+=300000;
             break;
      case 'E':case 'K':case 'P':case 'U':case 'Z':easting+=400000;
             break;
    }
    switch (gr2.toUpperCase()) {
      case 'A':case 'B':case 'C':case 'D':case 'E':northing+=400000;
             break;
      case 'F':case 'G':case 'H':case 'J':case 'K':northing+=300000;
             break;
      case 'L':case 'M':case 'N':case 'O':case 'P':northing+=200000;
             break;
      case 'Q':case 'R':case 'S':case 'T':case 'U':northing+=100000;
             break;
      case 'V':case 'W':case 'X':case 'Y':case 'Z':northing+=0;
             break;
    }
    gr3=gr3+"00000";
    gr3=gr3.substr(0,5);
    gr4=gr4+"00000";
    gr4=gr4.substr(0,5);
    easting+=parseInt(gr3);
    northing+=parseInt(gr4);

    var tmp=new Array();
    tmp[0]=easting;
    tmp[1]=northing;
    return(tmp);
  }else{
    var tmp=new Array();
    tmp[0]='error';
    tmp[1]='not a valid gridref';
    return(tmp);
  }
}

function enToGR(easting, northing, dp) {
  var gr="";
  var first="STNOHJ";
  easting=Math.floor(easting);
  northing=Math.floor(northing);
  var tmp=Math.floor(easting/500000) + 2*Math.floor(northing/500000)
  gr+=first.substring(tmp,tmp+1);
  easting=easting%500000;
  northing=northing%500000;
  var second="VWXYZQRSTULMNOPFGHJKABCDE";
  tmp=Math.floor(easting/100000) + 5*Math.floor(northing/100000);
  gr+=second.substring(tmp,tmp+1);
  easting=easting%100000;
  northing=northing%100000;
  if (typeof(dp)=="undefined" || dp>5 || dp<1) dp=5;
  //gr+=" ";
  tmp=easting+"";
  gr+=tmp.substring(0,dp);
  //gr+=" ";
  tmp=northing+"";
  gr+=tmp.substring(0,dp);
  return(gr);
}

function sin2(x) {
  return(Math.sin(x)*Math.sin(x));
}

function sin(x) {
  return(Math.sin(x));
}

function cos2(x) {
  return(Math.cos(x)*Math.cos(x));
}

function cos3(x) {
  return(Math.pow(Math.cos(x),3));
}

function cos5(x) {
  return(Math.pow(Math.cos(x),5));
}

function cos(x) {
  return(Math.cos(x));
}

function tan6(x) {
  return(Math.pow(Math.tan(x),6));
}

function tan4(x) {
  return(Math.pow(Math.tan(x),4));
}

function tan2(x) {
  return(Math.tan(x)*Math.tan(x));
}

function tan(x) {
  return(Math.tan(x));
}

function atan(x) {
  return(Math.atan(x));
}

function sec(x) {
  return(1/Math.cos(x));
}

function pow(x,y) {
  return(Math.pow(x,y));
}

function radToDeg(x) {
  return(x*180/Math.PI);
}

function degToRad(x) {
  return(x*Math.PI/180);
}


function OSGB36ToWGS84(lng,lat) {
  var a=6377563.396; //semi-major axis //OSGB36
  var b=6356256.910 //semi-minor axis
  //var a=6378137; //semi-major axis //WGS84
  //var b=6356752.3141 //semi-minor axis
  var e0=400000 //origin easting
  var n0=-100000 //origin northing
  var f0=0.9996012717; //Scale factor on central meridian
  var phi0=degToRad(49); //49deg N - lat of true origin in radians
  var lam0=degToRad(-2); //2deg W - long of true origin in radians

  var e2=((a*a)-(b*b))/(a*a); //ellipsoid squared eccentricity

  var phi=degToRad(lat);
  var lam=degToRad(lng);  
  var h=0;

  var v=a/(Math.sqrt(1-e2*sin2(phi)));
  var x=(v+h)*cos(phi)*cos(lam);
  var y=(v+h)*cos(phi)*sin(lam);
  var z=((1-e2)*v+h)*sin(phi);

//document.write('<br><br>v='+v);
//document.write('<br>e2='+e2);
//document.write('<br>cart='+x+':'+y+':'+z);

  //now in cartesian coords

  //perform Helmert datum transformations
  var tx=446.448;
  var ty=-125.157;
  var tz=542.060;
  var s=-20.4894/1000000;
  var rx=degToRad(0.1502/60/60);
  var ry=degToRad(0.2470/60/60);
  var rz=degToRad(0.8421/60/60);

  var newx=tx + (1+s)*x + (-rz)*y + ry*z;
  var newy=ty + rz*x + (1-s)*y + (-rx)*z;
  var newz=tz + (-ry)*x + rx*y + (1+s)*z;

  x=newx;
  y=newy;
  z=newz;


  //convert back to new lat/lng

  var a=6378137; //semi-major axis //WGS84
  var b=6356752.3141 //semi-minor axis

  var e2=((a*a)-(b*b))/(a*a); //ellipsoid squared eccentricity

  lam=atan(y/x);
  var p=Math.sqrt(x*x+y*y);
  var phi1=atan(z/(p*(1-e2)));
//document.write('<br>phi1='+phi1);
  do {
    phi=phi1;
    v=a/(Math.sqrt(1-e2*sin2(phi)));
    phi1=atan((z+e2*v*sin(phi))/p);
//document.write('<br><br>v='+v);
//document.write('<br>phi1='+phi1);
//document.write('<br>test='+Math.abs(phi-phi1));
  }while (Math.abs(phi-phi1)>0.00000001);
  phi=phi1;
  
  var tmp=new Array();
  tmp[0]=radToDeg(lam);//lng
  tmp[1]=radToDeg(phi);//lat
  return(tmp);
}

function WGS84ToOSGB36(lng,lat) {
  var a=6378137; //semi-major axis //WGS84
  var b=6356752.3141 //semi-minor axis
  var e0=400000 //origin easting
  var n0=-100000 //origin northing
  var f0=0.9996012717; //Scale factor on central meridian
  var phi0=degToRad(49); //49deg N - lat of true origin in radians
  var lam0=degToRad(-2); //2deg W - long of true origin in radians

  var e2=((a*a)-(b*b))/(a*a); //ellipsoid squared eccentricity

  var phi=degToRad(lat);
  var lam=degToRad(lng);  
  var h=0;

  var v=a/(Math.sqrt(1-e2*sin2(phi)));
  var x=(v+h)*cos(phi)*cos(lam);
  var y=(v+h)*cos(phi)*sin(lam);
  var z=((1-e2)*v+h)*sin(phi);

//document.write('<br><br>v='+v);
//document.write('<br>e2='+e2);
//document.write('<br>cart='+x+':'+y+':'+z);

  //now in cartesian coords

  //perform Helmert datum transformations
  var tx=-446.448;
  var ty=125.157;
  var tz=-542.060;
  var s=20.4894/1000000;
  var rx=degToRad(-0.1502/60/60);
  var ry=degToRad(-0.2470/60/60);
  var rz=degToRad(-0.8421/60/60);

  var newx=tx + (1+s)*x + (-rz)*y + ry*z;
  var newy=ty + rz*x + (1-s)*y + (-rx)*z;
  var newz=tz + (-ry)*x + rx*y + (1+s)*z;

  x=newx;
  y=newy;
  z=newz;


  //convert back to new lat/lng

  var a=6377563.396; //semi-major axis //OSGB36
  var b=6356256.910 //semi-minor axis

  var e2=((a*a)-(b*b))/(a*a); //ellipsoid squared eccentricity

  lam=atan(y/x);
  var p=Math.sqrt(x*x+y*y);
  var phi1=atan(z/(p*(1-e2)));
//document.write('<br>phi1='+phi1);
  do {
    phi=phi1;
    v=a/(Math.sqrt(1-e2*sin2(phi)));
    phi1=atan((z+e2*v*sin(phi))/p);
//document.write('<br><br>v='+v);
//document.write('<br>phi1='+phi1);
//document.write('<br>test='+Math.abs(phi-phi1));
  }while (Math.abs(phi-phi1)>0.00000001);
  phi=phi1;
  
  var tmp=new Array();
  tmp[0]=radToDeg(lam);//lng
  tmp[1]=radToDeg(phi);//lat
  return(tmp);
}

function calc_m(n,phi0,phi,b,f0)
{
    var ma=(1+n+((5/4)*n*n)+((5/4)*n*n*n))*(phi-phi0);
    var mb=((3*n)+(3*n*n)+((21/8)*n*n*n))*sin(phi-phi0)*cos(phi+phi0);
    var mc=(((15/8)*n*n)+((15/8)*n*n*n))*sin(2*(phi-phi0))*cos(2*(phi+phi0));
    var md=(35/24)*n*n*n*sin(3*(phi-phi0))*cos(3*(phi+phi0));
  return(b*f0*(ma-mb+mc-md));
}

function enToLL(easting,northing){
  var a=6377563.396; //semi-major axis //OSGB36
  var b=6356256.910 //semi-minor axis
  //var a=6378137; //semi-major axis //WGS84
  //var b=6356752.3141 //semi-minor axis
  var e0=400000 //origin easting
  var n0=-100000 //origin northing
  var f0=0.9996012717; //Scale factor on central meridian
  var phi0=degToRad(49); //49deg N - lat of true origin in radians
  var lam0=degToRad(-2); //2deg W - long of true origin in radians

  var e2=((a*a)-(b*b))/(a*a); //ellipsoid squared eccentricity
  var n=(a-b)/(a+b);
//document.write('<br>a='+a);
//document.write('<br>b='+b);
//document.write('<br>e0='+e0);
//document.write('<br>n0='+n0);
//document.write('<br>f0='+f0);
//document.write('<br>phi0='+phi0);
//document.write('<br>lam0='+lam0);
//document.write('<br>e2='+e2);
//document.write('<br>n='+n);


  var phi=phi0;
  var c=0;
  var m=0;
  do {
    phi=((northing-n0-m)/(a*f0))+phi;
    m=calc_m(n,phi0,phi,b,f0);
//document.write('<br><br>phi='+phi);
//document.write('<br>ma='+ma);
//document.write('<br>mb='+mb);
//document.write('<br>mc1='+((15/8)*n*n));
//document.write('<br>mc2='+((15/8)*n*n*n));
//document.write('<br>mc='+mc);
//document.write('<br>md='+md);
//document.write('<br>m='+m);
//document.write('<br>test='+(northing-n0-m));
    c++;
  }while (Math.abs(northing-n0-m)>0.01 && c<10)

  if (c>=10) return("error|Loop over ran");
//document.write('<br><br>m='+m);
//document.write('<br>phi='+phi);

  var v=a*f0*(pow(1-e2*(sin2(phi)),-0.5));
  var rho=a*f0*(1-e2)*(pow((1-(e2*(sin2(phi)))),-1.5));
  var eta2=(v/rho)-1;

//document.write('<br>v='+v);
//document.write('<br>rho='+rho);
//document.write('<br>eta2='+eta2);

  var t7=tan(phi)/(2*rho*v);
  var t8=(tan(phi)/(24*rho*pow(v,3)))*(5+3*tan2(phi)+eta2-9*tan2(phi)*eta2);
  var t9=(tan(phi)/(720*rho*pow(v,5)))*(61+90*tan2(phi)+45*tan4(phi));
  var t10=sec(phi)/v;
  var t11=(sec(phi)/(6*pow(v,3)))*((v/rho)+2*tan2(phi));
  var t12=(sec(phi)/(120*pow(v,5)))*(5+28*tan2(phi)+24*tan4(phi));
  var t12a=(sec(phi)/(5040*pow(v,7)))*(61+662*tan2(phi)+1320*tan4(phi)+720*tan6(phi));

//document.write('<br>7='+t7);
//document.write('<br>8='+t8);
//document.write('<br>9='+t9);
//document.write('<br>10='+t10);
//document.write('<br>11='+t11);
//document.write('<br>12='+t12);
//document.write('<br>12a='+t12a);

  var lat=phi-t7*pow((easting-e0),2)+t8*pow((easting-e0),4)-t9*pow((easting-e0),6);
  var lng=lam0+t10*(easting-e0)-t11*pow((easting-e0),3)+t12*pow((easting-e0),5)-t12a*pow((easting-e0),7);


//document.write('<br>lat='+lat);
//document.write('<br>lng='+lng);
  //convert rad to deg
  lat =radToDeg(lat);
  lng =radToDeg(lng);

  var tmp=new Array();
  tmp[0]=lng;
  tmp[1]=lat;
  
  return(tmp);
}

function grToLL(gridref) {
  var en=grToEN(gridref);
  if (en[0]!='error') {
    var easting=en[0];
    var northing=en[1];

//easting=651409.903;
//northing=313177.270;

    var ll=enToLL(easting,northing);
    ll=OSGB36ToWGS84(ll[0],ll[1]);
    return(ll);
  }else{
    return(en);
  }
}

function llToGR(lng,lat,dp) {
  var ll=WGS84ToOSGB36(lng,lat);
  if (ll[0]!='error') {
    var en=llToEN(ll[0],ll[1]);
    if (en[0]!='error') {
      var easting=en[0];
      var northing=en[1];

      var gr=enToGR(easting,northing,dp);
      return(gr);
    }else{
      return("error");
    }
  }else{
    return("error");
  }
}

function llToEN(lng,lat) {
  var a=6377563.396; //semi-major axis //OSGB36
  var b=6356256.910 //semi-minor axis
  //var a=6378137; //semi-major axis //WGS84
  //var b=6356752.3141 //semi-minor axis
  var e0=400000 //origin easting
  var n0=-100000 //origin northing
  var f0=0.9996012717; //Scale factor on central meridian
  var phi0=degToRad(49); //49deg N - lat of true origin in radians
  var lam0=degToRad(-2); //2deg W - long of true origin in radians

  var e2=((a*a)-(b*b))/(a*a); //ellipsoid squared eccentricity
  var n=(a-b)/(a+b);
  
  var phi=degToRad(lat);
  var lam=degToRad(lng);

  var v=a*f0*(pow(1-e2*(sin2(phi)),-0.5));
  var rho=a*f0*(1-e2)*(pow((1-(e2*(sin2(phi)))),-1.5));
  var eta2=(v/rho)-1;

  var m=calc_m(n,phi0,phi,b,f0);

  var t1=m+n0;
  var t2=v/2*sin(phi)*cos(phi);
  var t3=v/24*sin(phi)*cos3(phi)*(5-tan2(phi)+9*eta2);
  var t3a=v/720*sin(phi)*cos5(phi)*(61-58*tan2(phi)+tan4(phi));
  var t4=v*cos(phi);
  var t5=v/6*cos3(phi)*((v/rho)-tan2(phi));
  var t6=v/120*cos5(phi)*(5-18*tan2(phi)+tan4(phi)+14*eta2-58*tan2(phi)*eta2);
  
  var northing=t1+t2*pow(lam-lam0,2)+t3*pow(lam-lam0,4)+t3a*pow(lam-lam0,6);
  var easting=e0+t4*(lam-lam0)+t5*pow(lam-lam0,3)+t6*pow(lam-lam0,5);
  var tmp=new Array();
  tmp[0]=easting;
  tmp[1]=northing;
  
  return(tmp);

}

function grToLLText(gridref) {
  var tmp=grToLL(gridref);
  return(tmp[1]+","+tmp[0]);
}