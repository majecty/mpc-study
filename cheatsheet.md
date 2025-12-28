# MPC 스터디 공유 Cheat Sheet

---
- **비밀키**: 소유자만 아는 정보
- **공개키**: 모두에게 공개하는 정보
- 보통 비밀키 알면 공개키 생성 가능

---

- **비밀키**로 서명 생성
- **공개키**로 서명 검증
- **서명**: 비밀키 소유자가 인정한 사실. 위조 불가

---

- **지갑 주소** = $hash(공개키)$
- **비밀키**로 트랜잭션을 **서명**할 수 있음

---

### MPC TSS
- **MPC** = Multi Party Computation
- **TSS** = Threshold Signature Scheme
- **MPC TSS** = 여러 참여자가 함께 하나의 서명을 만드는 방법.

---

### Elliptic Curve
- 예시) $y^2\ mod\ p = (x^3 + 7)\ mod\ p$
- **비밀키**는 임의의 상수 $k$
- **공개키**는 $k \cdot G$
- 점 **G**는 커브마다 다르게 정해진 점

---

### Diffie-Hellman Key Exchange
- _alice_ : a, $A = a \cdot G$ 생성
- _bob_ : b, $B = b \cdot G$ 생성
- _alice_ ,  _bob_  서로 A와 B 공유
- _alice_ 는 B 를 받아서 $a \cdot B = a \cdot b \cdot G$ 생성
- _bob_ 은 A를 받아서 $b \cdot A = b \cdot a \cdot G$ 생성
- 둘은 둘만 아는 공유 정보 생성

---

### Schnorr Signature
- 비밀키 $x$, 공개키 $X = x \cdot G$
- 랜덤한 $k$ 고르기
- $K = k \cdot G$
- $e = hash(K \vert\vert m)$
- $s = k + e \cdot x$
- $서명 = (s, e)$


---

### Schnorr Signature 대충
- k = 랜덤. x = 비밀키
- $s = k + x$
- $s \cdot G = k \cdot G + x \cdot G$ 
- 검증하는 사람은 s, K, G 만 앎
- K, G만 가지고 s 값 생성 불가능


---

### ECDSA Signature
- 비밀키 $x$ 공개키 $X = x \cdot G$
- 랜덤한 $k$ 생성
- $K = k \cdot G$
- $s = k^{-1} \cdot (hash(m) + K_x \cdot x)$
- $서명 = (K_x, s)$

---

### ECDSA signature 대충
- k = 랜덤. x = 비밀키
- $s = k^{-1} \cdot x$
- $s \cdot K = k^{-1} \cdot x \cdot k \cdot G$
   $= x \cdot G = X$ 
- 검증하는 사람은 s, K, G 만 암
- K, G만 가지고 s 값 생성 불가능

---

### Schnorr vs ECDSA TSS
- **Schnorr**: 서명의 덧셈이 가능 → 쉬운 MPC
  - $s = s_a + s_b$
    $= (k_a + e \cdot x_a) + (k_b + e \cdot x_b)$
- **ECDSA**: 덧셈 불가능 → 복잡한 MPC 필요
  - $\frac{1}{k_a + k_b}$를 구할 방법이 없음

---

<!-- wide -->

### DKLs18 핵심 아이디어
- $k = k_a \cdot k_b$, $x = x_a \cdot x_b$
- $$s = hash(m) \cdot (\frac{1}{k_a} \cdot \frac{1}{k_b}) +  K_x \cdot \frac{x_a}{k_a} \cdot \frac{x_a}{k_b}$$
- OT 기반 곱셈으로 비밀 정보 노출 없이 곱셈

---

### OT = Oblivious Transfer

- 다양한 구현체 있음.

---

### OT 과정
- _alice_ 가 $m_0$ 와 $m_1$ 를 생성
- _bob_ 은 둘 중 하나를 고름. 이를 $m_c$ 라고 함

---

### OT 결과
- _alice_ 는 _bob_ 이 무얼 가져갔는지 모름
- _bob_ 은 자신이 갖지 못한 것이 무엇인지 모름

---

### OT 변형 과정
- _alice_ 가 랜덤한 $f$ 생성
- _alice_ 가 $m_0 = -f$ , $m_1 = \delta - f$ 생성
- _bob_ 이 자신이 가진 $c$ 에 따라 $m_c$ 선택

---

### OT 변형 결과

- _alice_ 가 가진 $f$ 와 _bob_ 이 가진 $m_c$ 를 더하면 $f + m_c = c \cdot \delta$
- $f$ 와 $m_c$ 는 공개되어도 안전.


---

<!-- wide -->

### OT를 통한 곱셈

- 목적: $i_a \cdot i_b$ 를 서로 정보를 숨긴채 곱셈.
- $(2 \cdot i_a) \cdot i_{b0}$ 을 OT로 곱셈. $i_{b0}$ 은 $i_b$ 의 0번째 비트
- $(4 \cdot i_a) \cdot i_{b1}$ 을 OT로 곱셈. $i_{b1}$ 은 $i_b$ 의 1번째 비트
- ...
- $(2^n \cdot i_a) \cdot i_{bn}$ 을 OT로 곱셈. $i_{bn}$ 은 $i_b$ 의 n번째 비트
- 위의 값들을 다 더하면 $i_a \cdot i_b$

---

### Elliptic curve OT 예시 - setup

- Alice: $A = a \cdot G$ 생성하고 Bob에게 전달
- Bob: 랜덤 $b$, $c \in \{0,1\}$ 생성. $B' = b \cdot G + c \cdot A$ 를 Alice에게 전달

---

<!-- wide -->

### Elliptic curve OT 예시 - key 생성

- Alice: $k_0 = hash(a \cdot B')$, $k_1 = hash(a \cdot (B' - A))$ 계산
- Bob: $k_c = hash(b \cdot A)$ 계산
- if c == 0 than $k_c = k_0 = hash(a \cdot b \cdot G)$
- if c == 1 than $k_c = k_1 = hash(a \cdot b \cdot G)$

---

### Elliptic curve OT 예시 - transfer

- Alice: $e_0 = encrypt_{k_0}(m_0)$, $e_1 = encrypt_{k_1}(m_1)$ 를 Bob에게 전달
- Bob: $k_c$로 $e_c$를 복호화해서 $m_c$ 획득

---

### Elliptic curve OT 예시 - 결론

- Alice: $m_0$, $m_1$을 암호화해서 Bob에게 보냄
- Bob은 자신이 골랐던 c에 맞게 $m_c$ 만 복호화 가능

---

### DKLs18 vs DKLs23
- **DKLs23**: t of n 지원, 3라운드 통신, 사전 준비 단계
