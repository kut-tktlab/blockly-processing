var samplePrograms = {
'1_blink': [
  '<?xml version="1.0" ?>',
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
   '<block id="1#|qobNpnrp_N]{jsSVZ" type="basics_setup" x="20" y="20"/>',
   '<block id="7E9fX#5)}ZuH=aPC3X_]" type="basics_loop" x="220" y="20">',
    '<statement name="DO">',
     '<block id="SI+__SKc4C#RsT)v7MaQ" type="led_set_color">',
      '<value name="LED">',
       '<shadow id="NhO`AlbZrhpYfx/V]hY_" type="math_number">',
        '<field name="NUM">0</field>',
       '</shadow>',
      '</value>',
      '<value name="COLOR">',
       '<shadow id="R$$rk]d66#zPtGEwG(:." type="colour_picker">',
        '<field name="COLOUR">#ff0000</field>',
       '</shadow>',
      '</value>',
      '<next>',
       '<block id="VmXXfbVv{Mrzl3oKh}!Z" type="basics_sleep">',
        '<value name="MSEC">',
         '<shadow id="2i0:v0mRKF,FT5Bdmxqi" type="math_number">',
          '<field name="NUM">1000</field>',
         '</shadow>',
        '</value>',
        '<next>',
         '<block id="ofSo/FA`t7|$6BU28dz*" type="led_turn_off">',
          '<value name="LED">',
           '<shadow id="G,AXIo2PKUS*/hPmoSTz" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
          '</value>',
          '<next>',
           '<block id="t[#[:V(pdQx-lVzotPm-" type="basics_sleep">',
            '<value name="MSEC">',
             '<shadow id="SA~EWMX?XWlNGU$bG`Dj" type="math_number">',
              '<field name="NUM">1000</field>',
             '</shadow>',
            '</value>',
           '</block>',
          '</next>',
         '</block>',
        '</next>',
       '</block>',
      '</next>',
     '</block>',
    '</statement>',
   '</block>',
  '</xml>',
  ''
].join('')
,
'2_blink': [
  '<?xml version="1.0" ?>',
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
   '<block id="4%V~22%pNM944N;Yy]VF" type="basics_setup" x="20" y="20"/>',
   '<block id="f8^-a~#c1KR6t3h6UT%w" type="basics_loop" x="170" y="20">',
    '<statement name="DO">',
     '<block id="^`GWbSe#y36)eZz)5q*i" type="controls_for_simple">',
      '<field name="VAR">i</field>',
      '<value name="TO">',
       '<shadow id="DT+|Y4%u`:qqWE[.JIYK" type="math_number">',
        '<field name="NUM">9</field>',
       '</shadow>',
      '</value>',
      '<statement name="DO">',
       '<block id="f#;Bg=uQ3yg,D3G6*t`a" type="led_set_color">',
        '<value name="LED">',
         '<shadow id="M+^4N!T=b8`%.c(6vmA/" type="math_number">',
          '<field name="NUM">0</field>',
         '</shadow>',
         '<block id="P3vJ^K-X4xHJmkGFIB9V" type="variables_get">',
          '<field name="VAR">i</field>',
         '</block>',
        '</value>',
        '<value name="COLOR">',
         '<shadow id="a=@Fv+kfkAKlGnpvJLZV" type="colour_picker">',
          '<field name="COLOUR">#ff0000</field>',
         '</shadow>',
        '</value>',
       '</block>',
      '</statement>',
      '<next>',
       '<block id="c|+)_bb^+tmUGYKuc2o4" type="basics_sleep">',
        '<value name="MSEC">',
         '<shadow id="yv2{@Kuyq}(;e(OeR!5g" type="math_number">',
          '<field name="NUM">1000</field>',
         '</shadow>',
        '</value>',
        '<next>',
         '<block id="3I*k19AYQZAs[z[[u|g8" type="led_turn_off_all">',
          '<next>',
           '<block id="?S|FE1hBB+tCV!SktTw:" type="basics_sleep">',
            '<value name="MSEC">',
             '<shadow id="+)4#tG:z#$rNxg}FS%|M" type="math_number">',
              '<field name="NUM">1000</field>',
             '</shadow>',
            '</value>',
           '</block>',
          '</next>',
         '</block>',
        '</next>',
       '</block>',
      '</next>',
     '</block>',
    '</statement>',
   '</block>',
  '</xml>',
  ''
].join('')
,
'3_blink': [
  '<?xml version="1.0" ?>',
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
   '<block id="4%V~22%pNM944N;Yy]VF" type="basics_setup" x="20" y="20"/>',
   '<block id="f8^-a~#c1KR6t3h6UT%w" type="basics_loop" x="170" y="20">',
    '<statement name="DO">',
     '<block id="^`GWbSe#y36)eZz)5q*i" type="controls_for_simple">',
      '<field name="VAR">i</field>',
      '<value name="TO">',
       '<shadow id="DT+|Y4%u`:qqWE[.JIYK" type="math_number">',
        '<field name="NUM">9</field>',
       '</shadow>',
      '</value>',
      '<statement name="DO">',
       '<block id="f#;Bg=uQ3yg,D3G6*t`a" type="led_set_color">',
        '<value name="LED">',
         '<shadow id="M+^4N!T=b8`%.c(6vmA/" type="math_number">',
          '<field name="NUM">0</field>',
         '</shadow>',
         '<block id="P3vJ^K-X4xHJmkGFIB9V" type="variables_get">',
          '<field name="VAR">i</field>',
         '</block>',
        '</value>',
        '<value name="COLOR">',
         '<shadow id="a=@Fv+kfkAKlGnpvJLZV" type="colour_picker">',
          '<field name="COLOUR">#ff0000</field>',
         '</shadow>',
        '</value>',
        '<next>',
         '<block id="c|+)_bb^+tmUGYKuc2o4" type="basics_sleep">',
          '<value name="MSEC">',
           '<shadow id="yv2{@Kuyq}(;e(OeR!5g" type="math_number">',
            '<field name="NUM">100</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</statement>',
      '<next>',
       '<block id="K4yVi7tr#2uKm.{@X(G|" type="controls_for_simple">',
        '<field name="VAR">i</field>',
        '<value name="TO">',
         '<shadow id="!P;6/E/FAP{f]%d)Y1p%" type="math_number">',
          '<field name="NUM">9</field>',
         '</shadow>',
        '</value>',
        '<statement name="DO">',
         '<block id="(5!5L)85m$E:ER=YqCe[" type="led_turn_off">',
          '<value name="LED">',
           '<shadow id="FEhXuo)VU!X|V1n_{Q]E" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="HnLmSNhLE/ax_^RMMwb`" type="variables_get">',
            '<field name="VAR">i</field>',
           '</block>',
          '</value>',
          '<next>',
           '<block id="-P%t4`~amUl)AOjeBi+W" type="basics_sleep">',
            '<value name="MSEC">',
             '<shadow id="BN{(p1A;Z5k%W+eh=(U?" type="math_number">',
              '<field name="NUM">100</field>',
             '</shadow>',
            '</value>',
           '</block>',
          '</next>',
         '</block>',
        '</statement>',
       '</block>',
      '</next>',
     '</block>',
    '</statement>',
   '</block>',
  '</xml>',
  ''
].join('')
,
'analog1': [
  '<?xml version="1.0" ?>',
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
   '<block id="1#|qobNpnrp_N]{jsSVZ" type="basics_setup" x="20" y="20">',
    '<statement name="DO">',
     '<block id="wSRAR}DjS;xEAKyX^^Gu" type="variables_set">',
      '<field name="VAR">t</field>',
      '<value name="VALUE">',
       '<shadow id="%3gH%REu`KFbOq}qn:~A" type="math_number">',
        '<field name="NUM">0</field>',
       '</shadow>',
      '</value>',
     '</block>',
    '</statement>',
   '</block>',
   '<block id="7E9fX#5)}ZuH=aPC3X_]" type="basics_loop" x="20" y="105">',
    '<statement name="DO">',
     '<block id="SI+__SKc4C#RsT)v7MaQ" type="led_set_color">',
      '<value name="LED">',
       '<shadow id="NhO`AlbZrhpYfx/V]hY_" type="math_number">',
        '<field name="NUM">0</field>',
       '</shadow>',
      '</value>',
      '<value name="COLOR">',
       '<shadow id="R$$rk]d66#zPtGEwG(:." type="colour_picker">',
        '<field name="COLOUR">#ff0000</field>',
       '</shadow>',
       '<block id="17*)~*.AMJve2j+j1KQP" type="colour_hsv">',
        '<value name="HUE">',
         '<shadow id="5DF,TUyf(COh=Z~3b{%k" type="math_number">',
          '<field name="NUM">0</field>',
         '</shadow>',
        '</value>',
        '<value name="SATURATION">',
         '<shadow id=",K3(N-x;^JHM5z=-3w4r" type="math_number">',
          '<field name="NUM">100</field>',
         '</shadow>',
        '</value>',
        '<value name="VALUE">',
         '<shadow id="oJc3k4GJl7^7I`:Z5Y7," type="math_number">',
          '<field name="NUM">100</field>',
         '</shadow>',
         '<block id="qknnISB:hmh=F;1V/He+" type="math_arithmetic">',
          '<field name="OP">MULTIPLY</field>',
          '<value name="A">',
           '<shadow id="E,aoO2=**d^k;^N`/SBo" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="w3^Sy)6Za_=*fH%yq0E;" type="math_arithmetic">',
            '<field name="OP">MINUS</field>',
            '<value name="A">',
             '<shadow id="2?!FOkrbQJc@G.q+BD/N" type="math_number">',
              '<field name="NUM">1</field>',
             '</shadow>',
            '</value>',
            '<value name="B">',
             '<shadow disabled="true" id="q.6,)p)7zw;Zi]4=fSD~" type="math_number">',
              '<field name="NUM">0</field>',
             '</shadow>',
             '<block id="=^}QLuV[ajMy$y[t`]Fb" type="math_trig">',
              '<field name="OP">COS</field>',
              '<value name="NUM">',
               '<block id="EwAvp1)a:+Zp5ucUqQtD" type="variables_get">',
                '<field name="VAR">t</field>',
               '</block>',
              '</value>',
             '</block>',
            '</value>',
           '</block>',
          '</value>',
          '<value name="B">',
           '<shadow id="ft62=+$g!tRi[lf1a3f;" type="math_number">',
            '<field name="NUM">50</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</value>',
       '</block>',
      '</value>',
      '<next>',
       '<block id="kXYeo5[gLGit{4Rj6+K~" type="math_change">',
        '<field name="VAR">t</field>',
        '<value name="DELTA">',
         '<shadow id="0XVc5qL)U=sjk~*m^p@`" type="math_number">',
          '<field name="NUM">6</field>',
         '</shadow>',
        '</value>',
        '<next>',
         '<block id="VmXXfbVv{Mrzl3oKh}!Z" type="basics_sleep">',
          '<value name="MSEC">',
           '<shadow id="2i0:v0mRKF,FT5Bdmxqi" type="math_number">',
            '<field name="NUM">33</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</next>',
     '</block>',
    '</statement>',
   '</block>',
  '</xml>',
  ''
].join('')
,
'analog2': [
  '<?xml version="1.0" ?>',
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
   '<block id="3p}|~D4VL.xh2Gj)aB}*" type="basics_setup" x="20" y="20">',
    '<statement name="DO">',
     '<block id=":{by]-Xb#uj009!@c)~@" type="variables_set">',
      '<field name="VAR">t</field>',
      '<value name="VALUE">',
       '<shadow id="Sj29+:iD~weA{}x?R:l-" type="math_number">',
        '<field name="NUM">0</field>',
       '</shadow>',
      '</value>',
     '</block>',
    '</statement>',
   '</block>',
   '<block id="`:ud;wra-oPu(G,QY==F" type="basics_loop" x="20" y="105">',
    '<statement name="DO">',
     '<block id="-FjO/t8=b7y+T8.e3(/w" type="controls_for_simple">',
      '<field name="VAR">i</field>',
      '<value name="TO">',
       '<shadow id="K(PEvctwXH6NEE5U-{L0" type="math_number">',
        '<field name="NUM">9</field>',
       '</shadow>',
      '</value>',
      '<statement name="DO">',
       '<block id="5v``UOOy9Scj1I#x~Ad6" type="variables_set">',
        '<field name="VAR">v</field>',
        '<value name="VALUE">',
         '<shadow id="]YQ6TL+=#nq(UL{O{V]k" type="math_number">',
          '<field name="NUM">0</field>',
         '</shadow>',
         '<block id="fOv2ii|+?hpgtq=FiO)`" type="math_arithmetic">',
          '<field name="OP">MULTIPLY</field>',
          '<value name="A">',
           '<shadow disabled="true" id="+[^z5Vw$}r#3|GkSOwNZ" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="sHp7Y{g{j=a!2O8$%f6p" type="math_arithmetic">',
            '<field name="OP">MINUS</field>',
            '<value name="A">',
             '<shadow id="@/QLhx1HBg~b$oc`bZvN" type="math_number">',
              '<field name="NUM">1</field>',
             '</shadow>',
            '</value>',
            '<value name="B">',
             '<shadow disabled="true" id="o6aHdR~E-=Rq}[EvN77J" type="math_number">',
              '<field name="NUM">0</field>',
             '</shadow>',
             '<block id="`0T}Qae^1)9$@]^77M$7" type="math_trig">',
              '<field name="OP">COS</field>',
              '<value name="NUM">',
               '<block id="@nF*2?G,uDJ:$5efNgl@" type="variables_get">',
                '<field name="VAR">t</field>',
               '</block>',
              '</value>',
             '</block>',
            '</value>',
           '</block>',
          '</value>',
          '<value name="B">',
           '<shadow id="%J$;0/:Lo.#OGnaTf2QF" type="math_number">',
            '<field name="NUM">50</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</value>',
        '<next>',
         '<block id="JEk?1sxunMWHunm54UR!" type="led_set_color">',
          '<value name="LED">',
           '<shadow id="b*4V84$bTp5.7LC^XWz5" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="S$=}2YA+u$x7fwYK4Qpl" type="variables_get">',
            '<field name="VAR">i</field>',
           '</block>',
          '</value>',
          '<value name="COLOR">',
           '<shadow id="Pkk(lUF98|*ZvrIKx@jz" type="colour_picker">',
            '<field name="COLOUR">#ff0000</field>',
           '</shadow>',
           '<block id="R4T#YW{1MNf1^*S-JJro" type="colour_hsv">',
            '<value name="HUE">',
             '<shadow id="|0-t=#:wa_}Tv.f1Z`MF" type="math_number">',
              '<field name="NUM">0</field>',
             '</shadow>',
            '</value>',
            '<value name="SATURATION">',
             '<shadow id="~a~F8w-7+]j$5Z9tB26-" type="math_number">',
              '<field name="NUM">100</field>',
             '</shadow>',
            '</value>',
            '<value name="VALUE">',
             '<shadow id="5_G0`2UfFb~#q9vsNRqP" type="math_number">',
              '<field name="NUM">1</field>',
             '</shadow>',
             '<block id="IH_)F|zR0[wp_@^XefiR" type="variables_get">',
              '<field name="VAR">v</field>',
             '</block>',
            '</value>',
           '</block>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</statement>',
      '<next>',
       '<block id="8$Ps|KLfPK_4PQarE-@}" type="math_change">',
        '<field name="VAR">t</field>',
        '<value name="DELTA">',
         '<shadow id="~O0J6HJ9g8xvXF@~%xwB" type="math_number">',
          '<field name="NUM">6</field>',
         '</shadow>',
        '</value>',
        '<next>',
         '<block id="3ph:(3nB]bvw.57pa@zx" type="basics_sleep">',
          '<value name="MSEC">',
           '<shadow id="B`U;*y7df(4Z.L0PvUWc" type="math_number">',
            '<field name="NUM">33</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</next>',
     '</block>',
    '</statement>',
   '</block>',
  '</xml>',
  ''
].join('')
,
'analog3': [
  '<?xml version="1.0" ?>',
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
   '<block id="3p}|~D4VL.xh2Gj)aB}*" type="basics_setup" x="20" y="20">',
    '<statement name="DO">',
     '<block id=":{by]-Xb#uj009!@c)~@" type="variables_set">',
      '<field name="VAR">t</field>',
      '<value name="VALUE">',
       '<shadow id="Sj29+:iD~weA{}x?R:l-" type="math_number">',
        '<field name="NUM">0</field>',
       '</shadow>',
      '</value>',
     '</block>',
    '</statement>',
   '</block>',
   '<block id="`:ud;wra-oPu(G,QY==F" type="basics_loop" x="20" y="105">',
    '<statement name="DO">',
     '<block id="-FjO/t8=b7y+T8.e3(/w" type="controls_for_simple">',
      '<field name="VAR">i</field>',
      '<value name="TO">',
       '<shadow id="K(PEvctwXH6NEE5U-{L0" type="math_number">',
        '<field name="NUM">9</field>',
       '</shadow>',
      '</value>',
      '<statement name="DO">',
       '<block id="5v``UOOy9Scj1I#x~Ad6" type="variables_set">',
        '<field name="VAR">v</field>',
        '<value name="VALUE">',
         '<shadow id="]YQ6TL+=#nq(UL{O{V]k" type="math_number">',
          '<field name="NUM">0</field>',
         '</shadow>',
         '<block id="fOv2ii|+?hpgtq=FiO)`" type="math_arithmetic">',
          '<field name="OP">MULTIPLY</field>',
          '<value name="A">',
           '<shadow disabled="true" id="+[^z5Vw$}r#3|GkSOwNZ" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="sHp7Y{g{j=a!2O8$%f6p" type="math_arithmetic">',
            '<field name="OP">MINUS</field>',
            '<value name="A">',
             '<shadow id="@/QLhx1HBg~b$oc`bZvN" type="math_number">',
              '<field name="NUM">0.5</field>',
             '</shadow>',
            '</value>',
            '<value name="B">',
             '<shadow disabled="true" id="o6aHdR~E-=Rq}[EvN77J" type="math_number">',
              '<field name="NUM">0</field>',
             '</shadow>',
             '<block id="`0T}Qae^1)9$@]^77M$7" type="math_trig">',
              '<field name="OP">COS</field>',
              '<value name="NUM">',
               '<block id=").iemIU1{h;}X~$3)#]V" type="math_arithmetic">',
                '<field name="OP">MINUS</field>',
                '<value name="A">',
                 '<shadow disabled="true" id="]oIId]h{PeGoNKL^hHG/" type="math_number">',
                  '<field name="NUM">0</field>',
                 '</shadow>',
                 '<block id="@nF*2?G,uDJ:$5efNgl@" type="variables_get">',
                  '<field name="VAR">t</field>',
                 '</block>',
                '</value>',
                '<value name="B">',
                 '<shadow disabled="true" id="2y#B!T[)[q5f]obDTl#T" type="math_number">',
                  '<field name="NUM">0</field>',
                 '</shadow>',
                 '<block id="t1.o?+jdOThX?}Po}t1O" type="math_arithmetic">',
                  '<field name="OP">MULTIPLY</field>',
                  '<value name="A">',
                   '<shadow disabled="true" id="T8b2N(oFD%.aSq`DG+1]" type="math_number">',
                    '<field name="NUM">0</field>',
                   '</shadow>',
                   '<block id="=mMtTrCR6`YMXTb;5R,g" type="variables_get">',
                    '<field name="VAR">i</field>',
                   '</block>',
                  '</value>',
                  '<value name="B">',
                   '<shadow id="3S4,zJh/q@eBgI=;|)P5" type="math_number">',
                    '<field name="NUM">10</field>',
                   '</shadow>',
                  '</value>',
                 '</block>',
                '</value>',
               '</block>',
              '</value>',
             '</block>',
            '</value>',
           '</block>',
          '</value>',
          '<value name="B">',
           '<shadow id="%J$;0/:Lo.#OGnaTf2QF" type="math_number">',
            '<field name="NUM">50</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</value>',
        '<next>',
         '<block id="JEk?1sxunMWHunm54UR!" type="led_set_color">',
          '<value name="LED">',
           '<shadow id="b*4V84$bTp5.7LC^XWz5" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="S$=}2YA+u$x7fwYK4Qpl" type="variables_get">',
            '<field name="VAR">i</field>',
           '</block>',
          '</value>',
          '<value name="COLOR">',
           '<shadow id="Pkk(lUF98|*ZvrIKx@jz" type="colour_picker">',
            '<field name="COLOUR">#ff0000</field>',
           '</shadow>',
           '<block id="R4T#YW{1MNf1^*S-JJro" type="colour_hsv">',
            '<value name="HUE">',
             '<shadow id="|0-t=#:wa_}Tv.f1Z`MF" type="math_number">',
              '<field name="NUM">0</field>',
             '</shadow>',
            '</value>',
            '<value name="SATURATION">',
             '<shadow id="~a~F8w-7+]j$5Z9tB26-" type="math_number">',
              '<field name="NUM">100</field>',
             '</shadow>',
            '</value>',
            '<value name="VALUE">',
             '<shadow id="5_G0`2UfFb~#q9vsNRqP" type="math_number">',
              '<field name="NUM">1</field>',
             '</shadow>',
             '<block id="IH_)F|zR0[wp_@^XefiR" type="variables_get">',
              '<field name="VAR">v</field>',
             '</block>',
            '</value>',
           '</block>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</statement>',
      '<next>',
       '<block id="8$Ps|KLfPK_4PQarE-@}" type="math_change">',
        '<field name="VAR">t</field>',
        '<value name="DELTA">',
         '<shadow id="~O0J6HJ9g8xvXF@~%xwB" type="math_number">',
          '<field name="NUM">6</field>',
         '</shadow>',
        '</value>',
        '<next>',
         '<block id="3ph:(3nB]bvw.57pa@zx" type="basics_sleep">',
          '<value name="MSEC">',
           '<shadow id="B`U;*y7df(4Z.L0PvUWc" type="math_number">',
            '<field name="NUM">33</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</next>',
     '</block>',
    '</statement>',
   '</block>',
  '</xml>',
  ''
].join('')
,
'rainbow': [
  '<?xml version="1.0" ?>',
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
   '<block id="4%V~22%pNM944N;Yy]VF" type="basics_setup" x="20" y="20">',
    '<statement name="DO">',
     '<block id="65qwtW/FdF.r+6!6:nCx" type="variables_set">',
      '<field name="VAR">t</field>',
      '<value name="VALUE">',
       '<shadow id="^g$a#F4^widY}mAPVVA/" type="math_number">',
        '<field name="NUM">0</field>',
       '</shadow>',
      '</value>',
     '</block>',
    '</statement>',
   '</block>',
   '<block id="f8^-a~#c1KR6t3h6UT%w" type="basics_loop" x="21" y="109">',
    '<statement name="DO">',
     '<block id="^`GWbSe#y36)eZz)5q*i" type="controls_for_simple">',
      '<field name="VAR">i</field>',
      '<value name="TO">',
       '<shadow id="DT+|Y4%u`:qqWE[.JIYK" type="math_number">',
        '<field name="NUM">9</field>',
       '</shadow>',
      '</value>',
      '<statement name="DO">',
       '<block id="zG?(:A]VW8EDlvwhc40K" type="variables_set">',
        '<field name="VAR">h</field>',
        '<value name="VALUE">',
         '<shadow id="2zVI#IBV`Qhxu+9dZp(`" type="math_number">',
          '<field name="NUM">0</field>',
         '</shadow>',
         '<block id="pDLI;=m`H!bMLI$IkV6X" type="math_modulo">',
          '<value name="DIVIDEND">',
           '<shadow id="K5XC3wM!}2.jqv6T/%*I" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="!f2:_rK~)IhmK)[8syBr" type="math_arithmetic">',
            '<field name="OP">ADD</field>',
            '<value name="A">',
             '<shadow id="gaN9iuG0okfF,T^@pgbk" type="math_number">',
              '<field name="NUM">0</field>',
             '</shadow>',
             '<block id="nGlz8D2s=Qw}c@F,e#wx" type="math_arithmetic">',
              '<field name="OP">MULTIPLY</field>',
              '<value name="A">',
               '<shadow disabled="true" id=".3`VlmE(LbZr=GQ95ppb" type="math_number">',
                '<field name="NUM">0</field>',
               '</shadow>',
               '<block id="v*gwP!+YE.x(YgGB}%E_" type="variables_get">',
                '<field name="VAR">i</field>',
               '</block>',
              '</value>',
              '<value name="B">',
               '<shadow id="K[DP$9}cZ0LfZZIeUC.E" type="math_number">',
                '<field name="NUM">36</field>',
               '</shadow>',
              '</value>',
             '</block>',
            '</value>',
            '<value name="B">',
             '<shadow id="$lC1!vK-]*2!Z@}d9Ac`" type="math_number">',
              '<field name="NUM">0</field>',
             '</shadow>',
             '<block id="*[ZR;DiG$xd)^P.9Jq36" type="variables_get">',
              '<field name="VAR">t</field>',
             '</block>',
            '</value>',
           '</block>',
          '</value>',
          '<value name="DIVISOR">',
           '<shadow id="vt?h[*3}Hj(hPHH]sTs:" type="math_number">',
            '<field name="NUM">360</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</value>',
        '<next>',
         '<block id="f#;Bg=uQ3yg,D3G6*t`a" type="led_set_color">',
          '<value name="LED">',
           '<shadow id="M+^4N!T=b8`%.c(6vmA/" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="P3vJ^K-X4xHJmkGFIB9V" type="variables_get">',
            '<field name="VAR">i</field>',
           '</block>',
          '</value>',
          '<value name="COLOR">',
           '<shadow id="a=@Fv+kfkAKlGnpvJLZV" type="colour_picker">',
            '<field name="COLOUR">#ff0000</field>',
           '</shadow>',
           '<block id="Y],+u3y$%+l|I31|Cd{u" type="colour_hsv">',
            '<value name="HUE">',
             '<shadow id="BD1p}PV.nr0lF0khCw4?" type="math_number">',
              '<field name="NUM">20</field>',
             '</shadow>',
             '<block id="cU+=%%w1!c{%ggry7Yvs" type="variables_get">',
              '<field name="VAR">h</field>',
             '</block>',
            '</value>',
            '<value name="SATURATION">',
             '<shadow id="f+qG.-`4C2|)3N8G|ICO" type="math_number">',
              '<field name="NUM">100</field>',
             '</shadow>',
            '</value>',
            '<value name="VALUE">',
             '<shadow id="AO31CI9GM69+~2-b~F2(" type="math_number">',
              '<field name="NUM">50</field>',
             '</shadow>',
            '</value>',
           '</block>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</statement>',
      '<next>',
       '<block id="p6c3;?QYAWD)({[/HB1c" type="math_change">',
        '<field name="VAR">t</field>',
        '<value name="DELTA">',
         '<shadow id="LPAH6Ie;aTN{KaH)LS|a" type="math_number">',
          '<field name="NUM">6</field>',
         '</shadow>',
        '</value>',
        '<next>',
         '<block id="c|+)_bb^+tmUGYKuc2o4" type="basics_sleep">',
          '<value name="MSEC">',
           '<shadow id="yv2{@Kuyq}(;e(OeR!5g" type="math_number">',
            '<field name="NUM">33</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</next>',
     '</block>',
    '</statement>',
   '</block>',
  '</xml>',
  ''
].join('')
,
'rgb_blink': [
  '<?xml version="1.0" ?>',
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
   '<block id="4%V~22%pNM944N;Yy]VF" type="basics_setup" x="20" y="20"/>',
   '<block id="f8^-a~#c1KR6t3h6UT%w" type="basics_loop" x="170" y="20">',
    '<statement name="DO">',
     '<block id="^`GWbSe#y36)eZz)5q*i" type="controls_for_simple">',
      '<field name="VAR">i</field>',
      '<value name="TO">',
       '<shadow id="DT+|Y4%u`:qqWE[.JIYK" type="math_number">',
        '<field name="NUM">9</field>',
       '</shadow>',
      '</value>',
      '<statement name="DO">',
       '<block id="zG?(:A]VW8EDlvwhc40K" type="variables_set">',
        '<field name="VAR">h</field>',
        '<value name="VALUE">',
         '<shadow id="2zVI#IBV`Qhxu+9dZp(`" type="math_number">',
          '<field name="NUM">0</field>',
         '</shadow>',
         '<block id="pDLI;=m`H!bMLI$IkV6X" type="math_modulo">',
          '<value name="DIVIDEND">',
           '<shadow id="K5XC3wM!}2.jqv6T/%*I" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="v*gwP!+YE.x(YgGB}%E_" type="variables_get">',
            '<field name="VAR">i</field>',
           '</block>',
          '</value>',
          '<value name="DIVISOR">',
           '<shadow id="vt?h[*3}Hj(hPHH]sTs:" type="math_number">',
            '<field name="NUM">3</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</value>',
        '<next>',
         '<block id="f#;Bg=uQ3yg,D3G6*t`a" type="led_set_color">',
          '<value name="LED">',
           '<shadow id="M+^4N!T=b8`%.c(6vmA/" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="P3vJ^K-X4xHJmkGFIB9V" type="variables_get">',
            '<field name="VAR">i</field>',
           '</block>',
          '</value>',
          '<value name="COLOR">',
           '<shadow id="a=@Fv+kfkAKlGnpvJLZV" type="colour_picker">',
            '<field name="COLOUR">#ff0000</field>',
           '</shadow>',
           '<block id="Y],+u3y$%+l|I31|Cd{u" type="colour_hsv">',
            '<value name="HUE">',
             '<shadow id="BD1p}PV.nr0lF0khCw4?" type="math_number">',
              '<field name="NUM">20</field>',
             '</shadow>',
             '<block id="nGlz8D2s=Qw}c@F,e#wx" type="math_arithmetic">',
              '<field name="OP">MULTIPLY</field>',
              '<value name="A">',
               '<shadow id=".3`VlmE(LbZr=GQ95ppb" type="math_number">',
                '<field name="NUM">0</field>',
               '</shadow>',
               '<block id="cU+=%%w1!c{%ggry7Yvs" type="variables_get">',
                '<field name="VAR">h</field>',
               '</block>',
              '</value>',
              '<value name="B">',
               '<shadow id="K[DP$9}cZ0LfZZIeUC.E" type="math_number">',
                '<field name="NUM">120</field>',
               '</shadow>',
              '</value>',
             '</block>',
            '</value>',
            '<value name="SATURATION">',
             '<shadow id="f+qG.-`4C2|)3N8G|ICO" type="math_number">',
              '<field name="NUM">100</field>',
             '</shadow>',
            '</value>',
            '<value name="VALUE">',
             '<shadow id="AO31CI9GM69+~2-b~F2(" type="math_number">',
              '<field name="NUM">100</field>',
             '</shadow>',
            '</value>',
           '</block>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</statement>',
      '<next>',
       '<block id="c|+)_bb^+tmUGYKuc2o4" type="basics_sleep">',
        '<value name="MSEC">',
         '<shadow id="yv2{@Kuyq}(;e(OeR!5g" type="math_number">',
          '<field name="NUM">1000</field>',
         '</shadow>',
        '</value>',
        '<next>',
         '<block id="3I*k19AYQZAs[z[[u|g8" type="led_turn_off_all">',
          '<next>',
           '<block id="?S|FE1hBB+tCV!SktTw:" type="basics_sleep">',
            '<value name="MSEC">',
             '<shadow id="+)4#tG:z#$rNxg}FS%|M" type="math_number">',
              '<field name="NUM">1000</field>',
             '</shadow>',
            '</value>',
           '</block>',
          '</next>',
         '</block>',
        '</next>',
       '</block>',
      '</next>',
     '</block>',
    '</statement>',
   '</block>',
  '</xml>',
  ''
].join('')
,
'rgb_move': [
  '<?xml version="1.0" ?>',
  '<xml xmlns="http://www.w3.org/1999/xhtml">',
   '<block id="4%V~22%pNM944N;Yy]VF" type="basics_setup" x="20" y="20">',
    '<statement name="DO">',
     '<block id="65qwtW/FdF.r+6!6:nCx" type="variables_set">',
      '<field name="VAR">t</field>',
      '<value name="VALUE">',
       '<shadow id="^g$a#F4^widY}mAPVVA/" type="math_number">',
        '<field name="NUM">0</field>',
       '</shadow>',
      '</value>',
     '</block>',
    '</statement>',
   '</block>',
   '<block id="f8^-a~#c1KR6t3h6UT%w" type="basics_loop" x="21" y="109">',
    '<statement name="DO">',
     '<block id="^`GWbSe#y36)eZz)5q*i" type="controls_for_simple">',
      '<field name="VAR">i</field>',
      '<value name="TO">',
       '<shadow id="DT+|Y4%u`:qqWE[.JIYK" type="math_number">',
        '<field name="NUM">9</field>',
       '</shadow>',
      '</value>',
      '<statement name="DO">',
       '<block id="zG?(:A]VW8EDlvwhc40K" type="variables_set">',
        '<field name="VAR">h</field>',
        '<value name="VALUE">',
         '<shadow id="2zVI#IBV`Qhxu+9dZp(`" type="math_number">',
          '<field name="NUM">0</field>',
         '</shadow>',
         '<block id="pDLI;=m`H!bMLI$IkV6X" type="math_modulo">',
          '<value name="DIVIDEND">',
           '<shadow id="K5XC3wM!}2.jqv6T/%*I" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="!f2:_rK~)IhmK)[8syBr" type="math_arithmetic">',
            '<field name="OP">ADD</field>',
            '<value name="A">',
             '<shadow id="gaN9iuG0okfF,T^@pgbk" type="math_number">',
              '<field name="NUM">0</field>',
             '</shadow>',
             '<block id="v*gwP!+YE.x(YgGB}%E_" type="variables_get">',
              '<field name="VAR">i</field>',
             '</block>',
            '</value>',
            '<value name="B">',
             '<shadow id="$lC1!vK-]*2!Z@}d9Ac`" type="math_number">',
              '<field name="NUM">0</field>',
             '</shadow>',
             '<block id="*[ZR;DiG$xd)^P.9Jq36" type="variables_get">',
              '<field name="VAR">t</field>',
             '</block>',
            '</value>',
           '</block>',
          '</value>',
          '<value name="DIVISOR">',
           '<shadow id="vt?h[*3}Hj(hPHH]sTs:" type="math_number">',
            '<field name="NUM">3</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</value>',
        '<next>',
         '<block id="f#;Bg=uQ3yg,D3G6*t`a" type="led_set_color">',
          '<value name="LED">',
           '<shadow id="M+^4N!T=b8`%.c(6vmA/" type="math_number">',
            '<field name="NUM">0</field>',
           '</shadow>',
           '<block id="P3vJ^K-X4xHJmkGFIB9V" type="variables_get">',
            '<field name="VAR">i</field>',
           '</block>',
          '</value>',
          '<value name="COLOR">',
           '<shadow id="a=@Fv+kfkAKlGnpvJLZV" type="colour_picker">',
            '<field name="COLOUR">#ff0000</field>',
           '</shadow>',
           '<block id="Y],+u3y$%+l|I31|Cd{u" type="colour_hsv">',
            '<value name="HUE">',
             '<shadow id="BD1p}PV.nr0lF0khCw4?" type="math_number">',
              '<field name="NUM">20</field>',
             '</shadow>',
             '<block id="nGlz8D2s=Qw}c@F,e#wx" type="math_arithmetic">',
              '<field name="OP">MULTIPLY</field>',
              '<value name="A">',
               '<shadow id=".3`VlmE(LbZr=GQ95ppb" type="math_number">',
                '<field name="NUM">0</field>',
               '</shadow>',
               '<block id="cU+=%%w1!c{%ggry7Yvs" type="variables_get">',
                '<field name="VAR">h</field>',
               '</block>',
              '</value>',
              '<value name="B">',
               '<shadow id="K[DP$9}cZ0LfZZIeUC.E" type="math_number">',
                '<field name="NUM">120</field>',
               '</shadow>',
              '</value>',
             '</block>',
            '</value>',
            '<value name="SATURATION">',
             '<shadow id="f+qG.-`4C2|)3N8G|ICO" type="math_number">',
              '<field name="NUM">100</field>',
             '</shadow>',
            '</value>',
            '<value name="VALUE">',
             '<shadow id="AO31CI9GM69+~2-b~F2(" type="math_number">',
              '<field name="NUM">100</field>',
             '</shadow>',
            '</value>',
           '</block>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</statement>',
      '<next>',
       '<block id="p6c3;?QYAWD)({[/HB1c" type="math_change">',
        '<field name="VAR">t</field>',
        '<value name="DELTA">',
         '<shadow id="LPAH6Ie;aTN{KaH)LS|a" type="math_number">',
          '<field name="NUM">1</field>',
         '</shadow>',
        '</value>',
        '<next>',
         '<block id="c|+)_bb^+tmUGYKuc2o4" type="basics_sleep">',
          '<value name="MSEC">',
           '<shadow id="yv2{@Kuyq}(;e(OeR!5g" type="math_number">',
            '<field name="NUM">1000</field>',
           '</shadow>',
          '</value>',
         '</block>',
        '</next>',
       '</block>',
      '</next>',
     '</block>',
    '</statement>',
   '</block>',
  '</xml>',
  ''
].join('')
,
'_': undefined
};
delete samplePrograms._;
