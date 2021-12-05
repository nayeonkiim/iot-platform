// Fill in  your WiFi networks SSID and password
#define SECRET_SSID "abcd"
#define SECRET_PASS "12345678"

// Fill in the hostname of your AWS IoT broker
#define SECRET_BROKER "ac4egjkblqudj-ats.iot.ap-northeast-2.amazonaws.com"

// Fill in the boards public certificate
const char SECRET_CERTIFICATE[] = R"(
-----BEGIN CERTIFICATE-----
MIICiTCCAXGgAwIBAgIVAJj9cQPyxHrss8f2qgNsNND9Qw2EMA0GCSqGSIb3DQEB
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yMTEwMjMxNjQ2
MzFaFw00OTEyMzEyMzU5NTlaMBgxFjAUBgNVBAMTDU15TUtSV2lGaTEwMTAwWTAT
BgcqhkjOPQIBBggqhkjOPQMBBwNCAAQnK1w0ixyzXpdwe7LxKgXWS9xfS5NNgXhp
GORS3w2DbRLzL3ovMF+SwEhlxEB84EGjSaZQK5CLJksQLQE+VVTDo2AwXjAfBgNV
HSMEGDAWgBTBVy2bV+JheFGT4Fvd8b3MNfsnejAdBgNVHQ4EFgQUUGgX7FR2idYq
HnlXyOFiqrNVWM8wDAYDVR0TAQH/BAIwADAOBgNVHQ8BAf8EBAMCB4AwDQYJKoZI
hvcNAQELBQADggEBABJZoEJJW0hqm0lMlRcauNhv9F0x/3OVpwBEFJotik1op7FZ
rJzDfTvjclOBhlGV37rqnZN5autp/bfxT5+q7IafXYppz1sxi3mtWFe/Zrj2i8xH
JpNnuhnrCgiXGrpuB/XgRym4g/GSiN69AlGH9dWBgKT/IHE6c37pupF5V9fqGPgq
eyFUzSifQfYm7pTotXKMJMAM4qEHlNzJAChuXFGWX60zfOLiofe7Eg7yB8YwiAP3
hc6IGv6FB+vTREvSJRox8/H4wZrICaqZLqayi/THLnpVih6/tue2M06ARIP3hf3q
Fc4/A9Q4RvKhjsykFnbsorbIL1GDvzZ0QcezSY0=
-----END CERTIFICATE-----
)";
