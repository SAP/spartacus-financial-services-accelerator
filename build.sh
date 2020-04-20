#!/usr/bin/env bash
set -e
set -o pipefail

SONAR=$1

./travis-scripts/validate-lint.sh