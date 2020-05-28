
/**
 *  [sj.circledraw.js]
 *  만든이 : 박종찬
 *  피드백 : idpjc1@naver.com
 *  서포트브라우저 : IE9++
 *  디스크립션은 지우지 말아주세요
 *
 *  컬러셋 그린 옐로~ :)
 *  그린, 옐로 : #00ff6b, #fbff22
 *
 * 	컬러셋 보라 핑크 ~ :)
 *  보라, 핑크 : #ff80f2, #8737ff
 *
 *  선없애기 : 색상을 transparent 로 바꾸기~
 */

$(function(){

/************************* 자세히 보면 초딩도 할수있는 사용법! :) *****************************/
// com:[선시작위치,그려질거리,라인끝모양]     - 선 시작위치  12시 : 270, 3시 :360, 6시: 450, 9시: 540   -선이그려지는거리: 100(맥시멈) - 라인끝모양 종류: butt|round|square
// reserve : true 일경우 역방향 진행, false일경우 정방향 진행
// backcircle[ 원사이즈, 그라데이션컬리1, 그라데이션컬러2, 보더넓이 ]
// frontCircle[ 원사이즈, 그라데이션컬리1, 그라데이션컬러2, 보더넓이 ]
/**************  이해 안가면 숫자를 막 바꿔보면서 이해해 보세요 :) 잘못넣으면 오류나니 따옴표 지우지말고 조심조심 바꾸세요 ^.^; *******/
$('#canvas').SjCircleDraw({
	com:[570,80,'round'], 
	reverse:false, 
	backCircle:[ 200, '#b1b1b1', '#b1b1b1', 1 ], 
	frontCircle:[ 200, '#090979', '#00d4ff', 70 ]
});

$('#canvas2').SjCircleDraw({
	com:[270,40,'round'], 
	reverse:true, 
	backCircle:[ 0, '#b1b1b1', '#b1b1b1', 1 ], 
	frontCircle:[ 200, '#ff80f2', '#8737ff', 70 ]
});



});

$.fn.SjCircleDraw = function(e) {
	var t, r = e.com[0],
		a = 3.6 * e.com[1],
		i = e.com[2],
		o = e.reverse,
		c = e.backCircle[0],
		n = e.backCircle[1],
		l = e.backCircle[2],
		h = e.backCircle[3],
		d = e.frontCircle[0],
		C = e.frontCircle[1],
		f = e.frontCircle[2],
		k = e.frontCircle[3],
		s = $(this)[0],
		S = $(s).parent().children().eq(1),
		b = s.getContext("2d"),
		g = s.width / 2,
		p = s.height / 2,
		v = 1.25,
		I = 0,
		P = 0,
		M = 360;
	b.lineCap = i, t = setInterval(function() {
		I = o ? --I : I += 1, b.clearRect(0, 0, s.width, s.height),
			function() {
				b.clearRect(0, 0, s.width, s.height), b.beginPath();
				var e = b.createLinearGradient(0, 0, 1e3, 0);
				e.addColorStop("0", n), e.addColorStop("0.5", l), b.strokeStyle = e, b.arc(g, p, c, Math.PI / 180, Math.PI / 180 * (r + M)), b.strokeStyle = n, b.lineWidth = h, b.stroke()
			}(),
			function() {
				b.beginPath();
				var e = b.createLinearGradient(0, 0, 1e3, 0);
				e.addColorStop("0", C), e.addColorStop("0.6", f), b.strokeStyle = e, b.lineWidth = k, b.arc(g, p, d, Math.PI / 180 * r, Math.PI / 180 * (r + I)), b.stroke()
			}(), P = o ? 100 - I / -M * 100 : I / M * 100, S.text(Math.floor(P)), (I <= -(a - 1) && o || a <= I && !o) && clearInterval(t)
	}, v)
};