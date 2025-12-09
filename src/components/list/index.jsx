import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
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
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const customCovers = {
  "O Mistério da Casa Antiga": "https://http2.mlstatic.com/D_NQ_NP_894425-MLB51180093755_082022-O.jpg",
  "Tecnologias do Futuro": "https://m.media-amazon.com/images/I/71mpVtuAakL._SY425_.jpg",
  "A Jornada do Herói": "https://m.media-amazon.com/images/I/61DyZ9IdBiL.jpg",
  "Introdução à Programação JavaScript": "https://m.media-amazon.com/images/I/71X7hMhMEUL._SY425_.jpg",
  "Culinária Prática para Iniciantes": "https://m.media-amazon.com/images/I/51nC1aTnCFL.jpg",
  "História do Brasil Contemporâneo": "https://m.media-amazon.com/images/I/71AugmJd4GL._SY425_.jpg",
  "Guia Completo de Jardinagem": "https://m.media-amazon.com/images/I/61r1mTWEWcL._SY425_.jpg",
  "Romance nas Estrelas": "https://m.media-amazon.com/images/I/81qK5peGZAL._SY466_.jpg",
  "Manual do Fotógrafo Moderno": "https://m.media-amazon.com/images/I/81t2wrtyyIL._AC_UF1000,1000_QL80_.jpg",
  "A Arte da Criatividade": "https://m.media-amazon.com/images/I/71kcEDLLlqL._AC_UF1000,1000_QL80_.jpg",
  "O Gato pret0": "https://lh5.googleusercontent.com/proxy/Yc5crTqpK9Kbq66ZR0B1TmP1If7Ebqx-WpPbzcd4Axe5yxnOiU0JtVJRlLqelOvG10Y6FEgvKWE6DlR99GV6mscZLrmZm6ywvRaCdeidda26KfmENZFrB5RttJyDus6vy8Y5iLvD",
  "Coraline": "https://livrariapublica.com.br/capa/coraline-neil-gaiman-pdf-B088ZGDQLJ.webp",
  
};


  const toggleDrawer = (state) => () => setOpen(state);

  const menuItems = [
    { text: "Livros", icon: <LibraryBooksIcon />, path: "/list" },
    { text: "Novo", icon: <AddCircleIcon />, path: "/createBooks" },
    { text: "Perfil", icon: <AccountCircleIcon />, path: "/editProfile" },
    { text: "Autor", icon: <EditNoteIcon />, path: "/author" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await api.get("/book");
        setBooks(response.data.response || []);
      } catch (error) {
        setError("Erro ao carregar os livros: " + error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url("https://wallpapers.com/images/hd/bookshelf-background-xfix8ihv6dmfjzyu.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
      }}
    >
      {/* NAVBAR */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
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

          {/* MENU DESKTOP */}
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

      {/* DRAWER MOBILE */}
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
                  <ListItemIcon sx={{ color: "#d4a017" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* LISTAGEM */}
      <Box
        sx={{
          height: "calc(100% - 64px)",
          px: { xs: 3, md: 8 },
          py: 5,
          overflowY: "auto",
          backdropFilter: "brightness(0.6)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Cinzel, serif",
            fontWeight: 500,
            color: "#d4a017",
            textAlign: "center",
            mb: 4,
          }}
        >
          Livros da Biblioteca 📚
        </Typography>

        {/* CARREGANDO / ERRO / SEM DADOS */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress sx={{ color: "#d4a017" }} />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : books.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "#fff" }}>
            Nenhum livro encontrado.
          </Typography>
        ) : (
          <Grid
            container
            spacing={4}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            }}
          >
            {books.map((book) => (
              <Card
                key={book.id}
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
                  sx={{
                        width: "100%",
                       height: 250,
                      objectFit: "cover",
                      }}
                  image={
                          customCovers[book.book_name] ||
                           book.coverUrl ||
                          "https://cdn-icons-png.flaticon.com/512/29/29302.png"
                        }
                        alt="Capa do Livro"
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
                    {book.book_name}
                  </Typography>

                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Publicação: {book.publication}
                  </Typography>

                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Páginas: {book.pages}
                  </Typography>

                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Preço: R$ {book.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default BookList;