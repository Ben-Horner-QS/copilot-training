PHONEY: test-be
test-be:
	docker exec copilot-be pytest

PHONEY: test-fe
test-fe:
	docker exec copilot-fe npm test
