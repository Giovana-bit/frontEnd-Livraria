import React, { useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";

function Home() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state) => () => setOpen(state);

  const booksRef = useRef(null);

  const scrollToBooks = () => {
    booksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const menuItems = [
    { text: "Livros", icon: <LibraryBooksIcon />, path: "/list" },
    { text: "Novo", icon: <AddCircleIcon />, path: "/createBooks" },
    { text: "Perfil", icon: <AccountCircleIcon />, path: "/editProfile" },
    { text: "Autor", icon: <EditNoteIcon />, path: "/author" },
  ];

  const livrosExemplo = [
    {
      titulo: "A Biblioteca da Meia-Noite",
      imagem:
        "https://m.media-amazon.com/images/I/81iqH8dpjuL._SY425_.jpg",
    },
    {
      titulo: "Príncipe Cruel",
      imagem:
        "https://m.media-amazon.com/images/I/81FH6q0EqYS._SY466_.jpg",
    },
    {
      titulo: "Os dois Morrem no final",
      imagem:
        "https://m.media-amazon.com/images/I/61QhNRjycfL._SY342_.jpg",
    },
    {
      titulo: "Mulheres que correm com os lobos",
      imagem:
        "https://m.media-amazon.com/images/I/7121bMhcNKL._SY466_.jpg",
    },
    {
      titulo: "A vida invisível de Addie LaRue",
      imagem: "https://m.media-amazon.com/images/I/71X245OYRBL._SY466_.jpg",
    },
    {
      titulo:"Coraline",
      imagem:"https://m.media-amazon.com/images/I/91DZobBc1BL._SY466_.jpg",
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundImage: `url("https://wallpapers.com/images/hd/bookshelf-background-xfix8ihv6dmfjzyu.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Biblioteca da Meia-Noite
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                href={item.path}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#d4a017",
                    transform: "scale(1.05)",
                    transition: "0.3s",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component="a" href={item.path}>
                  <ListItemIcon sx={{ color: "#d4a017" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* ===== SEÇÃO PRINCIPAL ===== */}
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 3, md: 10 },
          backdropFilter: "brightness(0.6)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Cinzel, serif",
            fontWeight: 400,
            mb: 1,
          }}
        >
          Bem-vindo à
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "Cinzel, serif",
            color: "#d4a017",
            mb: 2,
            textShadow: "0 0 10px rgba(0,0,0,0.8)",
          }}
        >
          Biblioteca da Meia-Noite
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: "600px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 300,
            mb: 4,
            lineHeight: 1.5,
          }}
        >
          Descubra mundos encantados, publique suas próprias histórias e explore
          novos universos entre páginas e curiosidades. 🌙
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={scrollToBooks}
            sx={{
              backgroundColor: "#d4a017",
              color: "#000",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#e8b51f" },
            }}
          >
            Explorar
          </Button>

          <Button
            variant="outlined"
            href="/createBooks"
            sx={{
              borderColor: "#d4a017",
              color: "#d4a017",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(212,160,23,0.1)",
                borderColor: "#e8b51f",
              },
            }}
          >
            Adicionar
          </Button>
        </Box>
      </Box>

      {/* ===== SEÇÃO DE LIVROS ===== */}
      <Box
      ref={booksRef}
        sx={{
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          py: 6,
          px: { xs: 3, md: 10 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Cinzel, serif",
            mb: 4,
            color: "#d4a017",
          }}
        >
          Livros em Destaque
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 4,
          }}
        >
          {livrosExemplo.map((livro) => (
            <Card
              key={livro.titulo}
              sx={{
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: 3,
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 15px rgba(212,160,23,0.5)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={livro.imagem}
                alt={livro.titulo}
              />

              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "Cinzel, serif",
                    textAlign: "center",
                    color: "#d4a017",
                  }}
                >
                  {livro.titulo}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;