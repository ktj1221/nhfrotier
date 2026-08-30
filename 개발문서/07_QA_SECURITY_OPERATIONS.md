# QA / 보안 / 운영 체크리스트 v1.0

## 1. 기능 테스트
- SSO 성공/실패/세션 만료
- 프로젝트 생성/수정/삭제
- 권한 없는 프로젝트 접근
- 파일 업로드/다운로드/삭제
- 파일 용량/확장자 오류
- Template 선택/버전 변경
- AI 생성 성공/실패/Retry
- 동일 AI Job 중복 제출
- 댓글/수정/삭제
- AI 의견 누락 여부
- 반영/보류/반려 상태 전이
- Version 생성/비교
- History 기록
- Export 실패/재시도

## 2. 보안 테스트
- Browser Network에서 LLM credential 노출 여부
- API 직접 호출 시 권한 우회 여부
- 프로젝트 간 파일 접근 차단
- IDOR 검사(projectId/fileId/versionId)
- 업로드 파일 확장자 위장
- 악성 파일 업로드 방어
- 민감정보 로그 노출 여부
- SQL injection / command injection 기본 검사
- XSS/HTML preview 정책 검토
- CSRF/SSO 연계 방식 점검
- Secret 파일/환경변수 노출 점검

## 3. AI 품질 테스트
- 참고자료 미선택/선택 상태 차이
- Template 적용 여부
- 동일 입력 반복 시 일관성
- 잘못된 정보 생성에 대한 UI 처리
- 의견 취합 누락률
- 근거자료가 필요한 고도화 시 RAG 출처 표시
- 프롬프트/응답 저장 정책 준수

## 4. 운영 체크리스트
- 컨테이너 health check
- DB backup/restore
- 파일 저장소 backup/restore
- LLM endpoint 장애 시 서비스 상태
- Retry 폭주 방지
- 대용량 Job queue 적체
- 디스크 용량
- DB connection pool
- Redis 장애 시 영향 범위
- 로그 보존 정책

## 5. 장애 대응 우선순위
### LLM 장애
사용자는 일반 기능을 계속 사용할 수 있어야 하며 AI 작업은 FAILED/RETRY 상태로 남는다.

### DB 장애
쓰기 기능을 제한하고 기존 읽기 가능 여부를 판단한다. 무리한 재시작보다 원인과 복구 상태를 먼저 확인한다.

### File Storage 장애
신규 업로드/Export를 제한하고 Version/메타데이터 손상 여부를 확인한다.

### Container 장애
health check 및 재기동 정책을 사용하되 반복 장애 원인을 먼저 확인한다.

## 6. 배포 전 승인 목록
- 소스/이미지 취약점 점검
- Secret/환경변수 점검
- SSO 연계 테스트 완료
- LLM API 인증 테스트 완료
- 파일 저장소 권한 검증
- DB schema migration 검증
- Rollback 절차 검증
- 운영 로그/감사 로그 확인
