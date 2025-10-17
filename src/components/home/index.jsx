import React, { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Home() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state) => () => setOpen(state);

  const menuItems = [
    { text: "Livros", icon: <LibraryBooksIcon />, path: "/books" },
    { text: "Novo", icon: <AddCircleIcon />, path: "/createBooks" },
    { text: "Perfil", icon: <AccountCircleIcon />, path: "/editProfile" },
  ];

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

      <Box
        sx={{
          height: "calc(100% - 64px)", // subtrai altura do AppBar
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          px: { xs: 3, md: 10 },
          backdropFilter: "brightness(0.6)",  // escurece levemente o fundo para dar contraste
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
          Descubra mundos encantados, publique suas próprias histórias e
          explore novos universos entre páginas e curiosidades. 🌙
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            href="/livros"
            sx={{
              backgroundColor: "#d4a017",
              color: "#000",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#e8b51f",
              },
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
    </Box>
  );
}

export default Home;