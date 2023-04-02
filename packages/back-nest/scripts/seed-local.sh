#!/bin/bash

yarn command import-projects &&
yarn command sync-projects &&
yarn command import-files &&
yarn command import-challenges
