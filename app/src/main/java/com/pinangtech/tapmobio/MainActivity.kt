package com.pinangtech.tapmobio

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.pinangtech.tapmobio.ui.TapmobioScreen
import com.pinangtech.tapmobio.ui.theme.TapmobioTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TapmobioTheme {
                TapmobioScreen()
            }
        }
    }
}
