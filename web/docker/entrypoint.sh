#!/bin/bash

INDEX_TEMPLATE=/usr/share/nginx/html/index.html.tmpl
INDEX=/usr/share/nginx/html/index.html
# 环境变量
#envsubst '$$MANAGEMENT_API,$$VUE_APP_BASE_API' < ${INDEX_TEMPLATE} > ${INDEX}

nginx -g "daemon off;"
