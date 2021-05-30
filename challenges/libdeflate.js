module.exports = [
  {
    name: "benchmark.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/benchmark.c"
  },
  {
    name: "checksum.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/checksum.c"
  },
  {
    name: "gzip.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/gzip.c"
  },
  {
    name: "prog_util.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/prog_util.c"
  },
  {
    name: "test_checksums.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/test_checksums.c"
  },
  {
    name: "test_custom_malloc.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/test_custom_malloc.c"
  },
  {
    name: "test_litrunlen_overflow.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/test_litrunlen_overflow.c"
  },
  {
    name: "test_trailing_bytes.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/test_trailing_bytes.c"
  },
  {
    name: "test_util.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/test_util.c"
  },
  {
    name: "test_util.h",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/test_util.h"
  },
  {
    name: "tgetopt.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/programs/tgetopt.c"
  },
  {
    name: "adler32.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/adler32.c"
  },
  {
    name: "adler32_vec_template.h",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/adler32_vec_template.h"
  },
  {
    name: "bt_matchfinder.h",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/bt_matchfinder.h"
  },
  {
    name: "cpu_features_common.h",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/cpu_features_common.h"
  },
  {
    name: "crc32.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/crc32.c"
  },
  {
    name: "crc32_vec_template.h",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/crc32_vec_template.h"
  },
  {
    name: "decompress_template.h",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/decompress_template.h"
  },
  {
    name: "gzip_compress.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/gzip_compress.c"
  },
  {
    name: "gzip_decompress.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/gzip_decompress.c"
  },
  {
    name: "utils.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/utils.c"
  },
  {
    name: "zlib_compress.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/zlib_compress.c"
  },
  {
    name: "zlib_decompress.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/zlib_decompress.c"
  },
  {
    name: "cpu_features.c",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/arm/cpu_features.c"
  },
  {
    name: "crc32_impl.h",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/x86/crc32_impl.h"
  },
  {
    name: "matchfinder_impl.h",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/x86/matchfinder_impl.h"
  },
  {
    name: "decompress_impl.h",
    source: "https://raw.githubusercontent.com/ebiggers/libdeflate/master/lib/x86/decompress_impl.h"
  },
  ].map((file) => ({
    ...file,
    project: "libdeflate",
    projectUrl: "https://github.com/ebiggers/libdeflate",
    licenseUrl: "https://github.com/ebiggers/libdeflate/blob/master/COPYING",
    license: "MIT",
    language: "C",
}));
