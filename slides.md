---
theme: gaia
_class: lead
pagiante: true
marp: true
math: mathjax
html: true
# auth-scaling: true
---

<!-- backgroundColor: #fff -->

# MPC 스터디 공유

- 주형 영찬 회문 창영
- 3주간 진행
- 각자 알고리즘 논문 조사

---

# 각 솔루션별 mpc 알고리즘

- fordefi - DKLs 23
- Fireblocks - MPC CMP(-> MPC BAM)
- ZenGo - Lindell18
- Coinbase Wallet - DKLs18, FROST
- Binance Custody - GG19 
- 레퍼런스 [1](https://hackmd.io/@torus/ryzootvn5), [2](https://www.fireblocks.com/blog/announcing-the-fireblocks-mpc-bam-protocol), [3](https://medium.com/fordefi/how-fordefi-supports-programmatic-defi-trading-for-institutions-888e5ac83287)

---

# 각 솔루션별 mpc 알고리즘(스터디원)

- fordefi - DKLs 23
- Fireblocks - MPC CMP(-> MPC BAM) (**창영**)
- ZenGo - Lindell18 (**주형**)
- Coinbase Wallet - DKLs18 (**주형**), FROST (**영찬**)
- Binance Custody - GG19 (**회문**)
- 레퍼런스 [1](https://hackmd.io/@torus/ryzootvn5), [2](https://www.fireblocks.com/blog/announcing-the-fireblocks-mpc-bam-protocol), [3](https://medium.com/fordefi/how-fordefi-supports-programmatic-defi-trading-for-institutions-888e5ac83287)

---

# 시작 전 공유

- 빠르게 수식을 살펴봅니다.
- 질문은 나중에 모아서 받을게요.
- 적당히 내용을 축약해서 설명하겠습니다.

---

# 발단 > 전개 > 위기 > 절정 > 결말

- **발단**: 기본 개념 (비밀키, 공개키, 타원곡선)
- **전개**: 기초 기술 (디피-헬만, Schnorr/ECDSA 서명)
- **위기**: ECDSA MPC 어려움 (곱셈 연산의 어려움)
- **절정**: 실제 프로토콜 (DKLs18, OT)
- **결말**: 요약 및 질의응답

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. 비밀키와 공개키

- **비밀키**: 소유자만 아는 정보
- **공개키**: 모두에게 공개하는 정보
- 보통 비밀키 알면 공개키 생성 가능

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. 비밀키와 공개키

- **비밀키**로 서명 생성
- **공개키**로 서명 검증
- **서명**: 비밀키 소유자가 인정한 사실. 위조 불가

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. 비밀키와 공개키, 그리고 지갑

- **지갑 주소** = 공개키 or $hash(공개키)$
- **비밀키**로 트랜잭션을 **서명**할 수 있음
- **트랜잭션** = 자산 소유자 alice가 bob에게 1eth 보냄

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. MPC TSS

- **MPC** = Multi Parti Computation
- **여러 참여자**가 자신의 **비밀 정보를 숨기면서** 함께 결과물 만들기

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. MPC TSS

- <span style="color: gray;">MPC = Multi Parti Computation</span>
- <span style="color: gray;">여러 참여자가 자신의 비밀 정보를 숨기면서 함께 결과물 만들기</span>
- **TSS** = Threshold Signature Scheme
- 여러 참여자가 협력하여 함께 **하나의 서명을 만드는** 방법

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. MPC TSS

- <span style="color: gray;">MPC = Multi Parti Computation</span>
- <span style="color: gray;">여러 참여자가 자신의 비밀 정보를 숨기면서 함께 결과물 만들기</span>
- <span style="color: gray;">TSS = Threshold Signature Scheme</span>
- <span style="color: gray;">여러 참여자가 협력하여 함께 하나의 서명을 만드는 방법</span>
- **MPC가 더 넓은 개념. TSS는 사실상 항상 MPC**

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. MPC TSS

- <span style="color: gray;">**MPC** = Multi Parti Computation</span>
- <span style="color: gray;">**TSS** = Threshold Signature Scheme</span>
- **MPC TSS** = 여러 참여자가 함께 하나의 서명을 만드는 방법.
- 5명중 3명이 승인했을 때만 지갑 서명을 만들 수 있게 하기
- 키 조각을 여러 인프라에 나누어놓고, 모든 인프라가 해킹당해야지만 키가 해킹당하는 상황 만들기

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. elliptic curve

<div style='display: flex'>
<div style="flex: 1;">

![elliptic curve from https://masteringethereum.xyz/chapter_4.html](./images/elliptic_curve.png)

</div>

<div style="flex: 1;">

- $y^2\ mod\ p = (x^3 + 7)\ mod\ p$

</div>
</div>

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. elliptic curve에서 점의 덧셈

<div style='display: flex'>
<div style="flex: 1;">

![w:500px elliptic curve add from https://masteringethereum.xyz/chapter_4.html](./images/elliptic_curve_add.png)

</div>

<div style="flex: 1;">

- $y^2\ mod\ p = (x^3 + 7)\ mod\ p$
- $P_1 + P_2 = P_3$

</div>
</div>

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. elliptic curve에서 점의 상수 곱

* 임의의 점 G
* $G + G = 2 \cdot G$
* $2 \cdot G + 2 \cdot G = 4 \cdot G$
* $2 \cdot G + G = 3 \cdot G$
* 이제 임의의 $k$ 에 대해 $k \cdot G$ 구할 수 있음

---

<!-- _backgroundColor: #e8f4fd -->

# 발단. elliptic curve 위의 비밀키와 공개키

- **비밀키**는 임의의 상수 $k$
- **공개키**는 $k \cdot G$
- 점 **G**는 커브마다 다르게 정해진 점
- 오늘 발표에서 앞으로 대문사 알파벳 하나가 나오면 항상 curve 위의 점
- 예) $K = k \cdot G$ , $X = x \cdot G$ , $A = a \cdot G$ , $B = b \cdot G$

---

<!-- _backgroundColor: #e8f4fd -->

# 발단 요약

- **비밀키($k$)**: 나만 아는 숫자 (상수)
- **공개키($K$)**: 타원곡선 위의 점 $K = k \cdot G$
- **타원곡선**: 점의 덧셈과 상수 곱 연산이 정의된 곡선
- **서명**: 비밀키를 이용해 생성, 공개키로 검증
- **지갑**: 공개키로부터 생성된 주소
- **MPC TSS**: 여러 명이 비밀키 조각을 나누어 갖고 협력하여 하나의 서명을 생성하는 기술

---

<!-- _backgroundColor: #fff2e8 -->

# 전개. elliptic 디피 헬만 키교환

<div style="display: flex">

<div style="flex: 1">

![height:500px diffie-hellman](./images/diffie-hellman.svg)

</div>

<div style="flex 1">

* _alice_ 가 a 와 $A = a \cdot G$ 생성
* _bob_ 이 b와 $B = b \cdot G$ 생성
* _alice_ 와 _bob_ 이 서로 A와 B 공유
* _alice_ 는 B 를 받아서 $a \cdot B = a \cdot b \cdot G$ 생성
* _bob_ 은 A를 받아서 $b \cdot A = b \cdot a \cdot G$ 생성
* 둘은 둘만 아는 공유 정보($a \cdot b \cdot G$) 생성

</div>
</div>

---

<!-- _backgroundColor: #fff2e8 -->

# 전개. schnorr 서명

* eddsa도 schnorr의 일종
* 비밀키 $x$ 공개키 $X = x \cdot G$
* 랜덤한 $k$ 고르기
* $K = k \cdot G$
* $e = H(K || message)$
* $s = k + e \cdot x$
* $서명 = (s, e)$

---

<!-- _backgroundColor: #fff2e8 -->

# 전개. schnorr 서명

- <span style="font-size: 0.8em; color: gray;">eddsa도 schnorr의 일종</span>
- <span style="font-size: 0.8em; color: gray;">비밀키 $x$ 공개키 $X = x \cdot G$</span>
- <span style="font-size: 0.8em; color: gray;">랜덤한 $k$ 고르기</span>
- <span style="font-size: 0.8em; color: gray;">$K = k \cdot G$</span>
- <span style="font-size: 0.8em; color: gray;">$e = hash(K || message)$</span>
- <span style="font-size: 0.8em; color: gray;">$s = k + e \cdot x$</span>
- <span style="font-size: 0.8em; color: gray;">$서명 = (s, e)$</span>
- 대충 $s = 랜덤값 + 메시지 해시 \cdot 비밀키$

---

<!-- _backgroundColor: #fff2e8 -->

# 전개. schnorr 대충 이해하기

- k = 랜덤값, x = 비밀키
- $K = k \cdot G$와 $X = x \cdot G$를 공개.
- 서명 = $(x + k)$
    - x와 k를 아는 사람만 만들 수 있음.
- $K + X = (k + x) \cdot G$

---

<!-- _backgroundColor: #fff2e8 -->

# 전개. ecdsa 서명

* 비밀키 $x$ 공개키 $X = x \cdot G$
* 랜덤한 $k$ 생성
* $K = k \cdot G$
* $s = k^{-1} \cdot (hash(m) + K_x \cdot x)$
* $서명 = (K_x, s)$

---

<!-- _backgroundColor: #fff2e8 -->

# 전개. ecdsa 서명

- <span style="font-size: 0.8em; color: gray;">비밀키 $x$ 공개키 $X = x \cdot G$</span>
- <span style="font-size: 0.8em; color: gray;">랜덤한 $k$ 생성</span>
- <span style="font-size: 0.8em; color: gray;">$K = k \cdot G$</span>
- <span style="font-size: 0.8em; color: gray;">$s = k^{-1} \cdot (hash(m) + K_x \cdot x)$</span>
- <span style="font-size: 0.8em; color: gray;">$서명 = (K_x, s)$</span>
- 대충 $s = 랜덤값^{-1}(메시지해시 + 공개값 \cdot 비밀키)$

---

<!-- _backgroundColor: #fff2e8 -->

# 전개. ecdsa 서명 대충 이해

- $k = 랜덤값$, $x = 비밀키$
- $K = k \cdot G$, $X = x \cdot G$
- $서명 = k^{-1} \cdot x$
- $서명 \cdot K = k^{-1} \cdot x \cdot k \cdot G = x \cdot G = X$
- $k^{-1}$ 이 x 에 곱해지는 거 기억해주세요.

---

<!-- _backgroundColor: #fff2e8 -->

# 전개 요약

- Diffie Hellman 키교환 = $공유 비밀값 = a \cdot b \cdot G$
- Schnorr 서명 = $s = 랜덤값 + 메시지해시 \cdot 비밀키$
- ECDSA 서명= $s = 랜덤값^{-1}(메시지해시 + 공개값 \cdot 비밀키)$ 

---

<!-- _backgroundColor: #ffe8e8 -->

# 위기. schnorr는 서명의 덧셈이 가능

<div style="display: flex">
<div style="flex: 1">

- $e = hash(K || message)$
- $s = k + e \cdot x$

</div>

<div style="flex: 1">

- $k = k_a + k_b$
- $x = x_a + x_b$
- $K = K_a + K_b$ 는 공개된 값
- $e = hash(K || message)$
- $s = s_a + s_b = (k_a + e \cdot x_a) + (k_b + e \cdot x_b)$
- **서명을 더하는 것 만으로도 2 of 2 TSS를 구현할 수 있음**

</div>
</div>

---
<!-- _backgroundColor: #ffe8e8 -->

# 위기. ECDSA는 덧셈이 불가능


<div style="display: flex">
<div style="flex: 1">

- $K = k \cdot G$
- $s = k^{-1} \cdot (hash(m) + K_x \cdot x)$

</div>
<div style="flex: 1">

- $k = k_a + k_b$
- $s = s_a + s_b = \frac{hash(m) + K_x \cdot (x_a + x_b)}{(k_a + k_b)}$
- $\frac{1}{k_a + k_b}$를 구할 방법이 없음.

</div>
</div>

---
<!-- _backgroundColor: #f0e8ff -->

# 절정. DKLs18

- $k = k_a \cdot k_b$
- $x = x_a \cdot x_b$
- $s = k^{-1} \cdot (hash(m) + K_x \cdot x)$
- $s = \frac{hash(m) + K_x \cdot (x_a \cdot x_b)}{(k_a \cdot k_b)}$
- $s = hash(m) \cdot (\frac{1}{k_a} \cdot \frac{1}{k_b}) + K_x \cdot (\frac{x_a}{k_a} \cdot \frac{x_b}{k_b})$
- 이제 Alice와 Bob이 서로의 비밀 정보를 노출시키지 않고 서로 곱하는 방법만 있으면 해결

---
<!-- _backgroundColor: #f0e8ff -->

# 절정. OT(oblivious transfer)

<div style="display: flex">
<div style="flex: 1">

![](./images/ot.svg)

</div>
<div style="flex: 1">

- _alice_ 가 $m_0$ 와 $m_1$ 를 생성
- _bob_ 은 둘 중 하나를 고름. 이를 $m_c$ 라고 함
- **_alice_ 는 _bob_ 이 무얼 가져갔는지 모름**
- **_bob_ 은 자신이 갖지 못한 것이 무엇인지 모름**

</div>
</div>


---

<!-- _backgroundColor: #f0e8ff -->

# 절정. OT 변형

임의의 값 $\delta$ 와 0또는 1인 값 $c$ 를 곱하는 걸 OT로 진행

<div style="display: flex">
<div style="flex: 1">

![height:500px](./images/cot.svg)

</div>
<div style="flex: 1">

- _alice_: 랜덤한 $f$ 생성
- _alice_: $m_0 = -f$ , $m_1 = \delta - f$
- _bob_ 이 $c$ 에 따라 $m_c$ 선택
    - if $c == 0$ then $m_c = -f$
    - if $c == 1$ then $m_c = \delta - f$
- $f + m_c = c \cdot \delta$
- 서로 자신이 가진 $\delta$ 와 $c$ 를 숨기고 이들의 곱을 구함

</div>
</div>

---

<!-- _backgroundColor: #f0e8ff -->

# 절정. OT 사용해서 임의의 수 곱셈


![width:700px](./images/multiply.JPG)
- [레퍼런스](https://m.blog.naver.com/kingforpoii/221281819038)

---

<!-- _backgroundColor: #f0e8ff -->

# 절정. OT 사용해서 임의의 수 곱셈


![](./images/otmul.avif)

- 비트 하나의 곱을 n번 해서 더하면 n비트의 곱

---

<!-- _backgroundColor: #f0e8ff -->

# 절정. Elliptic Curve를 활용한 OT 예시 - 1

- Alice가 $A = a \cdot G$ 를 만들고 $A$를 Bob에게 전달
- Bob이 랜덤으로 $b$, $c$ 생성. Alice에게 $B'$ 전달
    - $b = random, c = 0 or 1$
    - $B' = b \cdot G + c \cdot A$
- Alice는 $k_0$ 와 $k_1$ 계산.
    - $k_0 = hash(a \cdot B')$
    - $k_1 = hash(a \cdot (B' - A))$
- 여기까지 Diffie hellma의 변종. $k_0$ 혹은 $k_1$ 둘 중 하나가 $a \cdot b \cdot G$
    - $k_c = hash(a \cdot b \cdot G)$

---

<!-- _backgroundColor: #f0e8ff -->

# 절정. Elliptic Curve를 활용한 OT 예시 - 2

- Alice가 $e_0$ 과 $e_1$을 계산하여 Bob에게 전달
    - $e_0 = encrypt_{k_0}(m_0)$
    - $e_1 = encrypt_{k_1}{m_1}$
- Bob은 $k_c$ 로 $e_c$를 복호화해서 $m_c$를 얻음
    - $k_c = hash(b \cdot A)$ 
- 정리
    - Alice는 $m_0$ 과 $m_1$ 을 생성함
    - Bob은 $m_c$ 하나만 알게됨
    - Alice는 Bob이 뭘 가졌는지 모름.
---

<!-- _backgroundColor: #e8ffe8 -->

# 결말. DKLs18 요약

- ECDSA 서명을 하기 위해서 곱셈을 MPC로 해야함
- OT 기반 곱셈으로 이를 해결.

---

<!-- _backgroundColor: #e8ffe8 -->

# 결말. DKLs18 vs DKLs23

- 같은 사람들이 만들었지만 좀 다름
- t of n 지원
- 통신을 3라운드만 하면 되게 바꿈.
- 서명 전에 미리 준비하게 만듬.


<style>
  img.mermaid-100h {
    max-height: 100%;
  }
</style>
<script src="https://unpkg.com/mermaid@8.1.0/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>
