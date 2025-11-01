import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  Fade,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  FormControlLabel,
  Checkbox,
  Alert,
  Snackbar
} from "@mui/material";
import { MdOutlineQrCodeScanner, MdContentCopy, MdOpenInNew, MdLink } from "react-icons/md";
import { IoMdBarcode } from "react-icons/io";
import { BarcodeDialog } from "./BarcodeDialog";
import { QRCodeDialog } from "./QRCodeDialog";

const Root = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  [`& @global`]: {
    "*": {
      boxSizing: "border-box",
    },
    html: {
      height: "100%",
      width: "100%",
    },
    body: {
      height: "100%",
      width: "100%",
      margin: 0,
      padding: 0,
      fontFamily: theme.typography.fontFamily,
    },
    "#root": {
      height: "100%",
      width: "100%",
    },
  },
}));

const ScanCard = styled(Card)(({ theme }) => ({
  height: 180,
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
  "&:active": {
    transform: "translateY(-4px)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: "3rem",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  transition: "color 0.3s ease",
}));

const ResultCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

export function Home() {
  const [code, setCode] = useState("");
  const [openBarcodeReader, setOpenBarcodeReader] = useState(false);
  const [openQrCodeReader, setOpenQrCodeReader] = useState(false);
  const [autoOpenLinks, setAutoOpenLinks] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Função para verificar se é um link válido
  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      // Verifica se começa com www. ou tem formato de domínio
      const urlPattern = /^(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+/;
      return urlPattern.test(string);
    }
  };

  // Função para normalizar URL
  const normalizeUrl = (url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  // Função personalizada para definir código e verificar se é link
  const handleSetCode = (newCode) => {
    setCode(newCode);

    if (newCode && isValidUrl(newCode) && autoOpenLinks) {
      const normalizedUrl = normalizeUrl(newCode);
      setNotificationMessage(`Abrindo link: ${normalizedUrl}`);
      setShowNotification(true);

      // Pequeno delay para mostrar a notificação antes de abrir o link
      setTimeout(() => {
        window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
      }, 1000);
    }
  };

  const handleOpenBarcodeReader = () => {
    setOpenBarcodeReader(true);
  };

  const handleOpenQrCodeReader = () => {
    setOpenQrCodeReader(true);
  };

  const handleCopyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setNotificationMessage("Código copiado para a área de transferência!");
      setShowNotification(true);
    }
  };

  const handleOpenLink = () => {
    if (code && isValidUrl(code)) {
      const normalizedUrl = normalizeUrl(code);
      window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <Root>
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Box textAlign="center">
            {/* Header */}
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Scanner QR & Barcode
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}
            >
              Escaneie códigos de barras e QR codes de forma rápida e segura
            </Typography>

            {/* Configurações */}
            <Card elevation={1} sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
              <CardContent sx={{ py: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={autoOpenLinks}
                      onChange={(e) => setAutoOpenLinks(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MdLink />
                      <Typography variant="body2">
                        Abrir links automaticamente
                      </Typography>
                    </Stack>
                  }
                />
              </CardContent>
            </Card>

            {/* Scanner Cards */}
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={3}
              sx={{ mb: 3 }}
            >
              <ScanCard elevation={2}>
                <CardActionArea
                  onClick={handleOpenBarcodeReader}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 2
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 0 }}>
                    <IconWrapper>
                      <IoMdBarcode />
                    </IconWrapper>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Código de Barras
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Escaneie códigos de produtos e documentos
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </ScanCard>

              <ScanCard elevation={2}>
                <CardActionArea
                  onClick={handleOpenQrCodeReader}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 2
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 0 }}>
                    <IconWrapper>
                      <MdOutlineQrCodeScanner />
                    </IconWrapper>
                    <Typography variant="h6" component="h2" gutterBottom>
                      QR Code
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Leia links, textos e informações
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </ScanCard>
            </Stack>

            {/* Result Display */}
            {code && (
              <Fade in timeout={500}>
                <ResultCard elevation={1}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        label={isValidUrl(code) ? "Link Detectado" : "Resultado"}
                        color={isValidUrl(code) ? "success" : "primary"}
                        size="small"
                        variant="outlined"
                        icon={isValidUrl(code) ? <MdLink /> : undefined}
                      />
                      <Box sx={{ flexGrow: 1 }} />
                      {isValidUrl(code) && (
                        <Chip
                          icon={<MdOpenInNew />}
                          label="Abrir"
                          onClick={handleOpenLink}
                          size="small"
                          clickable
                          color="success"
                          variant="outlined"
                        />
                      )}
                      <Chip
                        icon={<MdContentCopy />}
                        label="Copiar"
                        onClick={handleCopyCode}
                        size="small"
                        clickable
                        variant="outlined"
                      />
                    </Stack>
                    <TextField
                      value={code}
                      label="Código escaneado"
                      multiline
                      maxRows={4}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: theme.palette.action.hover,
                        }
                      }}
                    />
                    {isValidUrl(code) && autoOpenLinks && (
                      <Alert
                        severity="info"
                        sx={{ mt: 2 }}
                        icon={<MdOpenInNew />}
                      >
                        Link será aberto automaticamente em uma nova aba
                      </Alert>
                    )}
                  </CardContent>
                </ResultCard>
              </Fade>
            )}

            {/* Footer */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                mt: 4,
                display: "block",
                opacity: 0.7
              }}
            >
              Desenvolvido pela GOR Informática
            </Typography>
          </Box>
        </Fade>
      </Container>

      <BarcodeDialog
        open={openBarcodeReader}
        setOpen={setOpenBarcodeReader}
        setCode={handleSetCode}
      />
      <QRCodeDialog
        open={openQrCodeReader}
        setOpen={setOpenQrCodeReader}
        setCode={handleSetCode}
      />

      {/* Notificações */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Root>
  );
}
